import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from '@seed/feature/product/data-access';
import { Product } from '@seed/feature/product/model';
import { LoadingOrErrorComponent, SharedUiModule } from '@seed/shared/ui';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-product-list',
  standalone: true,
  imports: [SharedUiModule, RouterModule, FormsModule, LoadingOrErrorComponent],
  templateUrl: './product-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  constructor(
    private productService: ProductService,
    private store: Store,
  ) {
    // store.dispatch(
    //   toastActions.addToast({
    //     toast: { title: 'First Toast', description: 'Hi, test toast component', timeoutSeconds: -1 },
    //   }),
    // );
  }

  selectedItem: Product | undefined;

  error$ = new Subject<HttpErrorResponse | null>();

  products$ = this.productService.refresh$.pipe(
    switchMap(() => this.productService.products$),
    catchError(err => {
      this.error$.next(err);
      return EMPTY;
    }),
  );

  selectItem(product: Product) {
    this.productService.selectItem(product);
  }
}
