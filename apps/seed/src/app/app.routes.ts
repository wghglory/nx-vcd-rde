import { Route } from '@angular/router';
import { loadRemoteModule } from '@nrwl/angular/mf';
import { NoAccessComponent, NotFoundComponent } from '@seed/core/ui';
import { MfeContainerComponent } from '@seed/feature/mfe';
import { productRoutes } from '@seed/feature/product';
import { AuthGuard } from '@seed/shared/data-access';
import { WelcomeComponent } from '@seed/shared/ui';

import { Layout } from './layout/layout';

const layout = (process.env['NX_MODE'] || 'sidebar') as Layout;

export const routes: Route[] = [
  {
    path: 'provider',
    canActivate: [AuthGuard],
    data: { layout },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('@seed/provider/home').then(m => m.ProviderHomeComponent),
      },
      {
        path: 'setting',
        loadComponent: () => import('@seed/provider/setting').then(m => m.ProviderSettingComponent),
      },
      {
        path: 'mfe',
        component: MfeContainerComponent,
      },
      // npx nx g @nrwl/angular:remote shop-mfe --host=seed
      {
        path: 'shop-mfe',
        loadChildren: () => loadRemoteModule('shop-mfe', './Module').then(m => m.RemoteEntryModule),
      },
    ],
  },
  {
    path: 'tenant',
    canActivate: [AuthGuard],
    data: { layout },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('@seed/tenant/home').then(m => m.TenantHomeComponent),
      },
      {
        path: 'setting',
        loadComponent: () => import('@seed/tenant/setting').then(m => m.TenantSettingComponent),
      },
    ],
  },
  {
    path: 'login',
    data: {
      layout: 'blank' as Layout,
    },
    children: [{ path: '', loadComponent: () => import('@seed/core/ui').then(m => m.LoginComponent) }],
  },
  {
    path: 'no-access',
    component: NoAccessComponent,
    data: { layout },
  },
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full',
    data: { layout },
  },
  {
    path: 'products',
    children: productRoutes,
    data: { layout },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { layout },
  },
];
