import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { startWithTap, stateHandler } from '@seed/shared/utils';
import { isEqual } from 'lodash';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounce,
  distinctUntilChanged,
  EMPTY,
  finalize,
  map,
  Observable,
  pairwise,
  share,
  Subject,
  switchMap,
  timer,
} from 'rxjs';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'seed-product-datagrid',
  standalone: true,
  imports: [CommonModule, RouterModule, ClarityModule],
  templateUrl: './product-datagrid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDatagridComponent {
  constructor(public productService: ProductService) {}

  selectedItem: Product | undefined;

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();
  private errorSource = new Subject<HttpErrorResponse | null>();
  error$ = this.errorSource.asObservable();

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(
    // prepare old and new states filters in order to delay
    // since behaviorSubject and clrDatagrid emits null and null, no need to `startWith(null)`
    pairwise(),
    // only when filter changes, timer(500) to defer to simulate typeahead.
    debounce(([prev, curr]) => {
      return isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500);
    }),
    map(([prev, curr]) => curr),
    // if prev and curr state are the same, no need to emit. e.g. filter was 'a', user type 'aa' and quickly rollback to 'a'
    distinctUntilChanged(isEqual),
  ) as Observable<ClrDatagridStateInterface>;

  products$ = combineLatest([
    this.dgState$,
    this.productService.refreshAction$, // actions like successful deletion to refresh the data
  ]).pipe(
    switchMap(([state]) => {
      const params = stateHandler(state);
      return this.productService.getProducts(params).pipe(
        startWithTap(() => {
          this.loadingSource.next(true);
          this.errorSource.next(null);
        }),
        finalize(() => {
          this.loadingSource.next(false);
        }),
        catchError(err => {
          this.errorSource.next(err);
          return EMPTY;
        }),
      );
    }),
    share(), // avoid datagrid async pipe twice 2 subscription AND delete
  );

  // will be called right after initially datagrid loads data
  // 1st: BehaviorSubject emit null
  // 2nd: emit default state: { "page": { "from": -1, "to": -1, "size": 10, "current": 1 }}
  // every filter stroke will also trigger it
  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
