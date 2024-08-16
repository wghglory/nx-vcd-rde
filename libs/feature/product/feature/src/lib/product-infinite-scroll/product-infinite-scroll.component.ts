import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '@seed/feature/product/data-access';
import { Product } from '@seed/feature/product/model';
import { RDEList } from '@seed/shared/model';
import { SharedUiModule } from '@seed/shared/ui';
import { CardState, cardStateHandler, startWithTap } from '@seed/shared/util';
import { VmwInfiniteScrollDirectiveModule } from '@vmw/ngx-utils';
import { AlertComponent } from 'clr-lift';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BehaviorSubject, catchError, concatMap, EMPTY, finalize, scan, Subject, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'seed-product-infinite-scroll',
  standalone: true,
  imports: [SharedUiModule, AlertComponent, InfiniteScrollModule, VmwInfiniteScrollDirectiveModule, RouterModule],
  templateUrl: './product-infinite-scroll.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfiniteScrollComponent {
  constructor(private productService: ProductService) {}

  @Output() deleteEvent = new EventEmitter();

  pageSize = 9;

  error$ = new Subject<HttpErrorResponse | null>();
  loading$ = new Subject<boolean>();

  state$ = new BehaviorSubject<CardState>({ current: 1, filters: [] });

  refresh$ = this.productService.refresh$.pipe(
    tap(() => {
      this.state$.next({ ...this.state$.value, current: 1 });
    }),
  );

  // loadMore --> change page --> get paged products --> scan
  // filter and load more
  productsWithFilter$ = this.state$.pipe(
    concatMap(state => {
      const params = cardStateHandler(state);

      return this.productService.getProducts(params).pipe(
        startWithTap(() => {
          this.loading$.next(true);
          this.error$.next(null); // error will be covered by next request
        }),
        finalize(() => this.loading$.next(false)),
        catchError(err => {
          this.error$.next(err);
          return EMPTY;
        }),
      );
    }),
    withLatestFrom(this.state$),
    // based on current page, reset
    // https://stackblitz.com/edit/rxjs-search-offset-k2p6ps?file=src%2Fapp%2Fapp.component.ts
    // another approach: https://codesandbox.io/s/clear-scan-qsbeuc?file=/src/app/app.component.ts
    scan((acc, [rde, state]) => {
      return state.current === 1 ? rde : { ...acc, values: [...acc.values, ...rde.values], page: state.current };
    }, {} as RDEList<Product>),
  );

  deleteProduct(product: Product) {
    this.productService.selectItem(product);
    this.deleteEvent.emit();
  }

  loadMore(pageCount: number) {
    if (this.state$.value.current < pageCount) {
      this.state$.next({ ...this.state$.value, current: this.state$.value.current + 1 });
    }
  }

  filterByProductName(name: string) {
    this.state$.next({ current: 1, filters: [{ property: 'name', value: name }] });
  }
}
