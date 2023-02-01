import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@seed/core/ui';
import { productRoutes } from '@seed/feature/product';
import { AuthGuard } from '@seed/shared/services';
import { WelcomeComponent } from '@seed/shared/ui';

import { Layout } from './layout/layout';

const layout = (process.env['NX_MODE'] || 'sidebar') as Layout;

const routes: Route[] = [
  {
    path: 'provider',
    canActivate: [AuthGuard],
    data: { layout },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('@seed/provider/home').then(m => m.ProviderHomeComponent), // TODO: nested route?
      },
      {
        path: 'setting',
        loadComponent: () => import('@seed/provider/setting').then(m => m.ProviderSettingComponent),
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
