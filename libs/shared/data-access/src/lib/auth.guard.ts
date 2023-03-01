import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NAV_CONFIG } from '@seed/shared/util';
import { catchError, map, Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getUserInfo().pipe(
      map(user => {
        if (!route.routeConfig?.children) {
          console.error(route.routeConfig);
          throw new Error('why route.routeConfig error');
        }

        const canActivate = NAV_CONFIG[user.roles].some(config =>
          route.routeConfig?.children?.some(c => c.path && config.link.includes(route.routeConfig?.path + '/' + c.path)),
        );

        if (canActivate === false) {
          this.router.navigate(['/no-access'], { replaceUrl: true });
        }

        return canActivate;
      }),
      catchError(() => {
        if (isDevMode()) {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        return of(false);
      }),
    );
  }
}
