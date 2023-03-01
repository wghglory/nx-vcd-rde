import { Component } from '@angular/core';
import { SharedModule } from '@seed/shared/module';
import { ShopService } from '@seed/shop/services';

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
