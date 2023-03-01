import { ChangeDetectionStrategy, Component, isDevMode } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClarityIcons, cogIcon, dashboardIcon, homeIcon, infoStandardIcon, organizationIcon, usersIcon } from '@cds/core/icon';
import { AuthService } from '@seed/shared/data-access';
import { SharedModule } from '@seed/shared/module';
import { NAV_CONFIG } from '@seed/shared/util';
import { VmwThemeToolsModule } from '@vmw/ngx-utils';
import { L10nService } from '@vmw/ngx-vip';
import { map } from 'rxjs';

import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

ClarityIcons.addIcons(infoStandardIcon, homeIcon, cogIcon, usersIcon, dashboardIcon, organizationIcon);

@Component({
  selector: 'seed-vertical-nav',
  templateUrl: './vertical-nav.component.html',
  styleUrls: ['./vertical-nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, RouterModule, VmwThemeToolsModule, AboutDialogComponent],
})
export class VerticalNavComponent {
  constructor(public authService: AuthService, private l10nService: L10nService, private router: Router) {}

  menuItems$ = this.authService.currentUser$.pipe(map(user => (user ? NAV_CONFIG[user.roles] : [])));

  aboutDialogOpen = false;
  activeElement: HTMLAnchorElement | undefined;

  get isDevMode() {
    return isDevMode();
  }

  // tab click trigger below event instead of routerLink
  // easier way to catch lazy loading modules that cannot be found [Loading chunk... err]
  // better way is initErrorHandler method in app.component.ts
  goRoute(linkPath: string) {
    this.router.navigateByUrl(linkPath).catch(() => {
      window.alert(this.l10nService.getMessage('CANNOT_LOAD_RESOURCE'));

      // [TA,TU] '/tenant/acme/plugins/Vk13YXJl/oss' --> '/'
      // [PA] '/provider/plugins/Vk13YXJl/oss' --> '/'
      const vCDHref = window.top?.location.href.replace(/plugins.+/, '');
      if (vCDHref) {
        window.top?.location.assign(vCDHref);
      }
    });
  }

  focusOnMain() {
    document.querySelector<HTMLElement>('.content-area')?.focus();
  }

  aboutOpen() {
    this.aboutDialogOpen = true;
    this.activeElement = document.activeElement as HTMLAnchorElement;
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
