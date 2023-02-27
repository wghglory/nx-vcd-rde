import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@seed/shared/modules';

@Component({
  selector: 'seed-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
  standalone: true,
  imports: [SharedModule, RouterModule],
})
export class ShopHomeComponent {}
