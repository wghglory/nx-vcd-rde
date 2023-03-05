/**
 * Remote app header for dev purpose only
 */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@seed/shared/data-access';
import { SignInPayload } from '@seed/shared/model';
import { SharedModule } from '@seed/shared/module';
import { VmwThemeToolsModule } from '@vmw/ngx-utils';

@Component({
  selector: 'seed-header-mfe',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, VmwThemeToolsModule],
  templateUrl: './header-mfe.component.html',
  styleUrls: ['./header-mfe.component.scss'],
})
export class HeaderMfeComponent {
  constructor(private authService: AuthService) {}

  user$ = this.authService.currentUser$;

  @Input() name = '';

  login(payload: SignInPayload) {
    this.authService.login(payload).subscribe();
  }
}
