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
import { interceptorProviders } from '@seed/core/interceptor';
import { NavbarComponent, ToastModule, VerticalNavComponent } from '@seed/core/ui';
import { AlertModule } from '@seed/shared/ui';
import { COMMON_ICONS } from '@seed/shared/utils';
import { initVIPConfig } from '@seed/shared/vip';
import { VmwClarityThemeService, VmwThemeToolsModule } from '@vmw/ngx-utils';
import { LocaleService, VIPModule, VIPService } from '@vmw/ngx-vip';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { StandaloneLayoutComponent } from './layout/standalone-layout/standalone-layout.component';
import { bootstrapFactory, PreloadService } from './services/preload.service';
import { themeFactory } from './theme/theme-factory';

@NgModule({
  declarations: [AppComponent, SidebarLayoutComponent, StandaloneLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
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
    RouterModule.forRoot(routes, {
      // initialNavigation: 'enabledBlocking',
      // enableTracing: false, // turn on for debugging
    }),

    // core
    VerticalNavComponent,
    NavbarComponent,
    ToastModule,

    // share
    AlertModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initVIPConfig,
      deps: [VIPService, LocaleService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: themeFactory,
      deps: [VmwClarityThemeService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: bootstrapFactory,
      deps: [PreloadService],
      multi: true,
    },
    interceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ClarityIcons.addIcons(...COMMON_ICONS);
  }
}
