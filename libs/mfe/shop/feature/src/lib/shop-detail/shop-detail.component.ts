import { Component } from '@angular/core';
import { ShopService } from '@seed/mfe/shop/data-access';
import { SharedModule } from '@seed/shared/module';
import { AlertComponent, PageContainerComponent, SpinnerComponent } from '@seed/shared/ui';
import { api, logger } from '@seed/shared/util';

@Component({
  selector: 'seed-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  standalone: true,
  imports: [SharedModule, SpinnerComponent, AlertComponent, PageContainerComponent],
})
export class ShopDetailComponent {
  constructor(private shopService: ShopService) {}

  data$ = this.shopService.products$.pipe(logger('table'), api());
}
