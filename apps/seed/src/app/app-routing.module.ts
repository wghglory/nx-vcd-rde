import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // initialNavigation: 'enabledBlocking',
      // enableTracing: false, // turn on for debugging
    }),
  ],
})
export class AppRoutingModule {}
