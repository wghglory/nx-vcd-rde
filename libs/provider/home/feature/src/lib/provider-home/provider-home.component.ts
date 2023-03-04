import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageContainerComponent, SharedUiModule, WelcomeComponent } from '@seed/shared/ui';

@Component({
  selector: 'seed-provider-home',
  standalone: true,
  imports: [SharedUiModule, PageContainerComponent, WelcomeComponent],
  templateUrl: './provider-home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderHomeComponent {}
