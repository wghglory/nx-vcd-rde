import { Component } from '@angular/core';
import { Product } from '@seed/feature/product/model';
import { ShopService } from '@seed/mfe/shop/data-access';
import { ApiQuery, RDEValue } from '@seed/shared/model';
import { SharedModule } from '@seed/shared/module';
import { AlertComponent, PageContainerComponent, SpinnerComponent } from '@seed/shared/ui';
import { catchError, map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'seed-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  standalone: true,
  imports: [SharedModule, SpinnerComponent, AlertComponent, PageContainerComponent],
})
export class ShopDetailComponent {
  constructor(private shopService: ShopService) {}

  data$: Observable<ApiQuery<RDEValue<Product>[]>> = this.shopService.products$.pipe(
    map(products => ({ loading: false, error: null, data: products })),
    catchError(error => {
      return of({ loading: false, error, data: null });
    }),
    startWith({ loading: true, error: null, data: null }),
  );
}
