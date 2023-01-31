import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NAV_CONFIG } from '@seed/shared/constant';
import { Role, SignInPayload } from '@seed/shared/models';
import { SharedModule } from '@seed/shared/modules';
import { AuthService } from '@seed/shared/services';
import { alertActions, AlertModule } from '@seed/shared/ui';
import { finalize } from 'rxjs';

@Component({
  selector: 'seed-login',
  standalone: true,
  imports: [SharedModule, FormsModule, AlertModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  username = '';
  password = '';
  submitting = false;
  alertKey = 'loginKey';

  // private readonly redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirect') || '/';

  getRedirectPageByRole(role: Role) {
    const redirectUrl = '';
    const navConfig = NAV_CONFIG[role];

    if (!navConfig) {
      return redirectUrl;
    }

    return navConfig[0].link;
  }

  login(payload: SignInPayload) {
    this.store.dispatch(alertActions.clearAlerts());
    this.submitting = true;

    this.authService
      .login(payload)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: res => {
          const user = res.body;

          // redirect to "home" by role
          if (user) {
            this.router.navigateByUrl(this.getRedirectPageByRole(user.roles));
          }
        },
        error: (err: HttpErrorResponse) => {
          this.store.dispatch(
            alertActions.addAlert({
              alert: {
                message: err.error?.message,
                alertKey: this.alertKey,
              },
            }),
          );
        },
      });
  }

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      return;
    }

    // TODO: redirect to home
  }
}
