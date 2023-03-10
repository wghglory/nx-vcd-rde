import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ProductService } from '@seed/feature/product/data-access';
import { Product } from '@seed/feature/product/model';
import { SharedUiModule } from '@seed/shared/ui';
import { dgState, startWithTap, stateHandler } from '@seed/shared/util';
import { BehaviorSubject, catchError, combineLatest, EMPTY, finalize, shareReplay, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-product-datagrid',
  standalone: true,
  imports: [RouterModule, SharedUiModule],
  templateUrl: './product-datagrid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDatagridComponent {
  constructor(public productService: ProductService) {}

  selectedItem: Product | undefined;

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  private errorSubject = new Subject<HttpErrorResponse | null>();
  error$ = this.errorSubject.asObservable();

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(dgState());

  products$ = combineLatest([
    this.dgState$,
    this.productService.refresh$, // actions like successful deletion to refresh the data
  ]).pipe(
    switchMap(([state]) => {
      const params = stateHandler(state);
      return this.productService.getProducts(params).pipe(
        startWithTap(() => {
          this.loadingSubject.next(true);
          this.errorSubject.next(null);
        }),
        finalize(() => {
          this.loadingSubject.next(false);
        }),
        catchError(err => {
          this.errorSubject.next(err);
          return EMPTY;
        }),
      );
    }),
    shareReplay(1), // avoid datagrid async pipe twice 2 subscription AND delete
  );

  // will be called right after initially datagrid loads data
  // 1st: BehaviorSubject emit null
  // 2nd: emit default state: { "page": { "from": -1, "to": -1, "size": 10, "current": 1 }}
  // every filter stroke will also trigger it
  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
