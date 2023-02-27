import { Route } from '@angular/router';
import { ShopDetailComponent, ShopHomeComponent } from '@seed/shop/ui';

export const remoteRoutes: Route[] = [
  { path: '', component: ShopHomeComponent },
  {
    path: 'detail',
    component: ShopDetailComponent,
  },
];
