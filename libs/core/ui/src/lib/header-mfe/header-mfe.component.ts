import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
}
