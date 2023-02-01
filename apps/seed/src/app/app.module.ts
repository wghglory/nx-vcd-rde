import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { interceptorProviders } from '@seed/core/interceptor';
import { NavbarComponent, VerticalNavComponent } from '@seed/core/ui';
import { AlertModule } from '@seed/shared/ui';
import { VmwClarityThemeService, VmwThemeToolsModule } from '@vmw/ngx-utils';
import { VIPModule } from '@vmw/ngx-vip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarLayoutComponent } from './layout/sidebar-layout/sidebar-layout.component';
import { StandaloneLayoutComponent } from './layout/standalone-layout/standalone-layout.component';
import { themePreloader } from './theme-loader';

@NgModule({
  declarations: [AppComponent, SidebarLayoutComponent, StandaloneLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    VIPModule.forRoot(),
    VmwThemeToolsModule.forRoot(),
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    AppRoutingModule,

    // core
    VerticalNavComponent,
    NavbarComponent,

    // share
    AlertModule,
  ],
  providers: [
    interceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: themePreloader,
      deps: [VmwClarityThemeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
