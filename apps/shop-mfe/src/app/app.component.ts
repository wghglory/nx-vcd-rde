import { Component } from '@angular/core';
import { VmwClarityTheme, VmwClarityThemeService } from '@vmw/ngx-utils';

@Component({
  selector: 'seed-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private themeService: VmwClarityThemeService) {
    this.themeService.theme = VmwClarityTheme.Dark;
  }
}
