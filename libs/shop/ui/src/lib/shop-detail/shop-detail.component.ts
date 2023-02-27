import { Component } from '@angular/core';
import { SharedModule } from '@seed/shared/modules';

@Component({
  selector: 'seed-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ShopDetailComponent {}
