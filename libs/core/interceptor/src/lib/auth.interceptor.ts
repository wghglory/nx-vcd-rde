import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * after a long period, the session is timeout, requesting API may result in 403
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(event => {
        if (event instanceof HttpErrorResponse) {
          const bounce = [
            event.status === 401, // unauthorized
            /\/api\//.test(request.url), // API endpoint to /api/*
            !/\/api\/login/.test(request.url), // not API calls for login

            // not API calls for current-user, handled in UI level
            !/\/api\/session/.test(request.url),
          ].every(Boolean);

          if (bounce) {
            this.router.navigateByUrl('/login', {
              replaceUrl: true,
            });
          }
        }

        return throwError(() => event);
      }),
    );
  }
}

export function AuthInspectorFactory(router: Router) {
  return new AuthInterceptor(router);
}
