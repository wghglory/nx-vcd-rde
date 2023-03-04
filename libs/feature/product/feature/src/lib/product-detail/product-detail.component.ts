import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@seed/feature/product/data-access';
import { LoadingOrErrorComponent, PageContainerComponent, SharedUiModule } from '@seed/shared/ui';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-product-detail',
  standalone: true,
  imports: [SharedUiModule, PageContainerComponent, LoadingOrErrorComponent],
  templateUrl: './product-detail.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  readonly error$ = new Subject<HttpErrorResponse | null>();

  product$ = this.route.params.pipe(
    switchMap(({ id }) => {
      return this.productService.getProduct(id);
    }),
    catchError(err => {
      this.error$.next(err);
      return EMPTY;
    }),
  );
}
