import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { SignInPayload, VcdSession } from '@seed/shared/model';
import { AUTH_CONTEXT, TENANT_CONTEXT } from '@seed/shared/util';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loadingSub = new BehaviorSubject(false);
  loading$ = this.loadingSub.asObservable();

  private currentUserSub = new BehaviorSubject<VcdSession | null>(null);
  // ----- Test Sub: -----
  // private currentUserSub = new BehaviorSubject<VcdSession | null>({
  //   user: 'admin',
  //   org: 'System',
  //   userId: 'admin-id',
  //   roles: 'System Administrator',
  // } as VcdSession);
  currentUser$ = this.currentUserSub.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  setCurrentUser(user: VcdSession | null) {
    this.currentUserSub.next(user);
  }
  completeUserStream() {
    this.currentUserSub.complete();
  }

  getUserInfo(headers?: Record<string, string>) {
    if (this.currentUserSub.value) {
      return of(this.currentUserSub.value);
    }

    this.loadingSub.next(true);

    // note: interceptor adds {{AUTH_TOKEN}} into header already
    return this.http
      .get<VcdSession>(`/api/session`, {
        headers: new HttpHeaders(headers),
      })
      .pipe(
        tap(user => {
          this.currentUserSub.next(user);
          this.loadingSub.next(false);
          // sessionStorage.setItem(TENANT_CONTEXT, session.orgId);
          // sessionStorage.setItem(AUTH_CONTEXT, user.org);
        }),
        // retry(1),
        catchError((err: HttpErrorResponse) => {
          this.currentUserSub.next(null);
          this.loadingSub.next(false);

          sessionStorage.clear();

          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
          if (err.status === 403) {
            this.router.navigateByUrl('/forbidden', {
              replaceUrl: true,
            });
          }
          return throwError(() => err);
        }),
      );
  }

  login(payload: SignInPayload) {
    return this.http
      .post<VcdSession>(`/api/sessions`, null, {
        observe: 'response',
        headers: { Authorization: 'Bearer ' + window.btoa(`${payload.username}:${payload.password}`) },
      })
      .pipe(
        tap(res => {
          this.currentUserSub.next(res.body);
          // sessionStorage.setItem(TENANT_CONTEXT, session.orgId);
          if (res.body) {
            sessionStorage.setItem(AUTH_CONTEXT, res.body.org);
          }

          if (isDevMode()) {
            const jwt = res.headers.get('jwt');
            jwt && localStorage.setItem('jwt', jwt);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.currentUserSub.next(null);
          sessionStorage.clear();
          return throwError(() => err);
        }),
      );
  }

  logout() {
    return this.http.delete(`/api/session`, {}).pipe(
      tap(() => {
        sessionStorage.clear();

        if (isDevMode()) {
          localStorage.removeItem('jwt');
        }

        this.setCurrentUser(null);
        this.completeUserStream();

        window.location.href = window.location.origin + '/login';
      }),
    );
  }
}
