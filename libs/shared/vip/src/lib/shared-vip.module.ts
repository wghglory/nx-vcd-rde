import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LocaleService, VIPModule, VIPService } from '@vmw/ngx-vip';

import { initVIPConfig } from './vip.util';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initVIPConfig,
      deps: [VIPService, LocaleService],
      multi: true,
    },
  ],
  exports: [VIPModule],
})
export class SharedVipModule {}
