import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LocaleService, VIPModule, VIPService } from '@vmw/ngx-vip';

import { initVIPConfig } from './vip.util';

@NgModule({
  imports: [VIPModule.forRoot(), HttpClientTestingModule],
  exports: [VIPModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initVIPConfig,
      deps: [VIPService, LocaleService],
      multi: true,
    },
  ],
})
export class SharedVipSpecModule {}
