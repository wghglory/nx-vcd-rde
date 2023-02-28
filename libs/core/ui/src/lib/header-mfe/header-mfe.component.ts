/**
 * Remote app header for dev purpose only
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SignInPayload } from '@seed/shared/models';
import { SharedModule } from '@seed/shared/modules';
import { AuthService } from '@seed/shared/services';
import { VmwThemeToolsModule } from '@vmw/ngx-utils';

@Component({
  selector: 'seed-header-mfe',
  standalone: true,
  imports: [CommonModule, SharedModule, VmwThemeToolsModule],
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
