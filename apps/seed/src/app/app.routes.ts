import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { NoAccessComponent, NotFoundComponent } from '@seed/core/feature';
import { productRoutes } from '@seed/feature/product/feature';
import { AuthGuard } from '@seed/shared/data-access';
import { MfeContainerComponent } from '@seed/shared/feature';
import { WelcomeComponent } from '@seed/shared/ui';

import { Layout } from './layout/layout';

const layout = (process.env['NX_MODE'] || 'sidebar') as Layout;

const mfeRoutes: Route[] = [
  {
    path: 'shop-mfe',
    loadChildren: () => loadRemoteModule('shop-mfe', './Module').then(m => m.RemoteEntryModule),
  },
  {
    path: 'harbor-mfe',
    loadChildren: () => loadRemoteModule('harbor-mfe', './Module').then(m => m.RemoteEntryModule),
  },
];

export const routes: Route[] = [
  {
    path: 'provider',
    canActivate: [AuthGuard],
    data: { layout },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('@seed/provider/home/feature').then(m => m.ProviderHomeComponent),
      },
      {
        path: 'setting',
        loadComponent: () => import('@seed/provider/setting/feature').then(m => m.ProviderSettingComponent),
      },
      {
        path: 'mfe',
        component: MfeContainerComponent,
      },
      // MFE placeholder
      ...mfeRoutes,
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
        loadComponent: () => import('@seed/tenant/home/feature').then(m => m.TenantHomeComponent),
      },
      {
        path: 'setting',
        loadComponent: () => import('@seed/tenant/setting/feature').then(m => m.TenantSettingComponent),
      },
    ],
  },
  {
    path: 'login',
    data: {
      layout: 'blank' as Layout,
    },
    children: [{ path: '', loadComponent: () => import('@seed/core/feature').then(m => m.LoginComponent) }],
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
  // <!--INJECTION_POINT_DO_NOT_DELETE-->
  {
    path: 'products',
    children: productRoutes,
    data: { layout },
  },
  {
    path: 'students',
    loadChildren: () => import('@seed/feature/student/feature').then(m => m.FeatureStudentFeatureModule),
    // loadChildren: () => import('@seed/feature/student-store/feature').then(m => m.FeatureStudentStoreFeatureModule),
    data: { layout },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { layout },
  },
];
