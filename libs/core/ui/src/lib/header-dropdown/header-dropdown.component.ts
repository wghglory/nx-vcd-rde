import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityIcons, pluginIcon } from '@cds/core/icon';
import { SharedModule } from '@seed/shared/modules';
import { DEFAULT_ICON_SIZE } from '@seed/shared/utils';
import { VmwClarityTheme } from '@vmw/ngx-utils';
import { map } from 'rxjs';

/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-explicit-any */

// const darkThemeHeaderClass = 'header-8';
// const lightThemeHeaderClass = 'header-7';

type RemoteApp = {
  name: string; // shop app
  url: string; // http://localhost:8080
};

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
  constructor(private http: HttpClient) {
    ClarityIcons.addIcons(pluginIcon);
  }

  // @Input()
  // set theme(value: string) {
  //   this.headerClass = value === VmwClarityTheme.Dark ? darkThemeHeaderClass : lightThemeHeaderClass;
  // }
  // headerClass = darkThemeHeaderClass;

  readonly DEFAULT_ICON_SIZE = DEFAULT_ICON_SIZE;

  mfeApps$ = this.http.get<Record<string, string>>('assets/module-federation.manifest.json').pipe(
    map(json => {
      const result: { name: string; url: string }[] = [];
      for (const [key, value] of Object.entries(json)) {
        result.push({ name: key, url: value });
      }
      return result;
    }),
  );

  openRemoteAppMfeTab(remoteApp: RemoteApp): void {
    window.open(remoteApp.url);
  }
}
