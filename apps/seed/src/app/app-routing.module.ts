import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@seed/core/ui';
import { productRoutes } from '@seed/feature/product';
import { AuthGuard } from '@seed/shared/services';
import { WelcomeComponent } from '@seed/shared/ui';

import { Layout } from './layout/layout';

const routes: Route[] = [
  {
    path: 'provider',
    canActivate: [AuthGuard],
    data: {
      layout: 'sidebar' as Layout,
    },
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
    data: {
      layout: 'sidebar' as Layout,
    },
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
    data: {
      layout: 'sidebar' as Layout,
    },
  },
  {
    path: 'products',
    children: productRoutes,
    data: {
      layout: 'sidebar' as Layout,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      layout: 'sidebar' as Layout,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
