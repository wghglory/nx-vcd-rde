import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@seed/shared/data-access';
import { Role, SignInPayload } from '@seed/shared/model';
import { SharedModule } from '@seed/shared/module';
import { NAV_CONFIG } from '@seed/shared/util';
import { AlertComponent } from 'clr-lift';
import { finalize } from 'rxjs';

@Component({
  selector: 'seed-login',
  standalone: true,
  imports: [SharedModule, FormsModule, AlertComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  username = '';
  password = '';
  submitting = false;
  alertKey = 'loginKey';
  error?: HttpErrorResponse;

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
          this.error = err;
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
