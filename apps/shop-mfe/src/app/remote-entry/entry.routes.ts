import { Route } from '@angular/router';
import { ShopDetailComponent, ShopHomeComponent } from '@seed/mfe/shop/feature';

export const remoteRoutes: Route[] = [
  { path: '', component: ShopHomeComponent },
  {
    path: 'detail',
    component: ShopDetailComponent,
  },
];
