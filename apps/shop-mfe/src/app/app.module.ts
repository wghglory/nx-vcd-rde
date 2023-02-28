import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClarityIcons } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavbarComponent, ToastModule, VerticalNavComponent } from '@seed/core/ui';
import { AlertModule } from '@seed/shared/ui';
import { COMMON_ICONS } from '@seed/shared/utils';
import { VmwClarityThemeConfig, VmwClarityThemeService, VmwThemeToolsModule } from '@vmw/ngx-utils';
import { VIPModule } from '@vmw/ngx-vip';

import { AppComponent } from './app.component';

export function themeLoader(themeService: VmwClarityThemeService) {
  return () => {
    return new Promise<void>(resolve => {
      themeService
        .initialize({
          clarityDarkPath: '/clr-ui-dark.min.css',
          clarityLightPath: '/clr-ui.min.css',
        } as VmwClarityThemeConfig)
        .then(() => {
          resolve();
        });
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    ClarityModule,
    VIPModule.forRoot(),
    VmwThemeToolsModule.forRoot(),

    // core
    VerticalNavComponent,
    NavbarComponent,
    ToastModule,

    // share
    AlertModule,

    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () => import('./remote-entry/entry.module').then(m => m.RemoteEntryModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' },
    ),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: themeLoader,
      deps: [VmwClarityThemeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(...COMMON_ICONS);
  }
}
