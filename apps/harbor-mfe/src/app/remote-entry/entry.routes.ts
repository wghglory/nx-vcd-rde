import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  { path: '', loadChildren: () => import('@seed/mfe/harbor/feature').then(m => m.MfeHarborFeatureModule) },
];
