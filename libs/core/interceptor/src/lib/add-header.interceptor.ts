import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // retrieve data set by VCD directly, refer to:
    // https://gitlab.eng.vmware.com/core-build/vcd_ui/blob/master/content/core/src/main/vcd/services/vcd-auth-token-holder.service.ts
    if (!request.url.includes('/i18n/api/') && !request.url.includes('/api/sessions')) {
      const jwt = localStorage.getItem('jwt'); // from vcd

      const headers: Record<string, string> = {};

      if (jwt) {
        headers['Authorization'] = `Bearer ${jwt}`;
      }

      request = request.clone({ setHeaders: headers });
    }
    return next.handle(request);
  }
}
