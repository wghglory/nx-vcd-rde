import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageContainerComponent, SharedUiModule, WelcomeComponent } from '@seed/shared/ui';

@Component({
  selector: 'seed-tenant-home',
  standalone: true,
  imports: [SharedUiModule, PageContainerComponent, WelcomeComponent],
  templateUrl: './tenant-home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantHomeComponent {}
