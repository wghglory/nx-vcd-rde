import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

// This is defined in our .env file.
console.log('>>> NX_APP_NAME', process.env['NX_APP_NAME']);
console.log('>>> NX_BUILD_DATE', process.env['NX_BUILD_DATE']);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
