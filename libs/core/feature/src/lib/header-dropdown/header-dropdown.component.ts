import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityIcons, pluginIcon } from '@cds/core/icon';
import { MfeLookupService } from '@seed/shared/data-access';
import { RemoteApp } from '@seed/shared/model';
import { SharedModule } from '@seed/shared/module';
import { DEFAULT_ICON_SIZE } from '@seed/shared/style';
import { VmwClarityTheme } from '@vmw/ngx-utils';
import { map } from 'rxjs';

/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-explicit-any */

// const darkThemeHeaderClass = 'header-8';
// const lightThemeHeaderClass = 'header-7';

/**
 * Dropdown addition to the CSP header - USED IN LOCAL DEV MODE ONLY
 */
@Component({
  selector: 'seed-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.scss'],
  standalone: true,
  imports: [RouterModule, SharedModule],
})
export class HeaderDropdownComponent {
  constructor(private mfeLookupService: MfeLookupService) {
    ClarityIcons.addIcons(pluginIcon);
  }

  // @Input()
  // set theme(value: string) {
  //   this.headerClass = value === VmwClarityTheme.Dark ? darkThemeHeaderClass : lightThemeHeaderClass;
  // }
  // headerClass = darkThemeHeaderClass;

  readonly DEFAULT_ICON_SIZE = DEFAULT_ICON_SIZE;

  mfeApps$ = this.mfeLookupService.mfeApps$;

  openRemoteAppMfeTab(remoteApp: RemoteApp) {
    window.open(remoteApp.url);
  }
}
