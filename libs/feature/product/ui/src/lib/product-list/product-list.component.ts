import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { Store } from '@ngrx/store';
import { toastActions } from '@seed/core/ui';
import { ProductService } from '@seed/feature/product/data-access';
import { Product } from '@seed/feature/product/model';
import { LoadingOrErrorComponent } from '@seed/shared/ui';
import { logger } from '@seed/shared/util';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ClarityModule, FormsModule, LoadingOrErrorComponent],
  templateUrl: './product-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  constructor(private productService: ProductService, private store: Store) {
    store.dispatch(
      toastActions.addToast({
        toast: { title: 'First Toast', description: 'Hi, test toast component', timeoutSeconds: -1 },
      }),
    );
  }

  selectedItem: Product | undefined;

  error$ = new Subject<HttpErrorResponse | null>();

  products$ = this.productService.refreshAction$.pipe(
    switchMap(() => {
      return this.productService.products$;
    }),
    logger('table'),
    catchError(err => {
      this.error$.next(err);
      return EMPTY;
    }),
  );

  selectItem(product: Product) {
    this.productService.selectItem(product);
  }
}
