import { Component } from '@angular/core';
import { ShopService } from '@seed/mfe/shop/data-access';
import { SharedModule } from '@seed/shared/module';

@Component({
  selector: 'seed-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ShopDetailComponent {
  constructor(private shopService: ShopService) {}

  data$ = this.shopService.products$;
}
