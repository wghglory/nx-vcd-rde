import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider, FactoryProvider, Provider } from '@angular/core';
import { Router } from '@angular/router';

import { AddHeaderInterceptor } from './lib/add-header.interceptor';
import { AuthInspectorFactory } from './lib/auth.interceptor';

export const interceptorProviders: Provider[] = [
  <ClassProvider>{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true,
  },
  <FactoryProvider>{
    provide: HTTP_INTERCEPTORS,
    useFactory: AuthInspectorFactory,
    multi: true,
    deps: [Router],
  },
];
