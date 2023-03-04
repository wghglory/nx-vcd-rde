import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageContainerComponent, SharedUiModule } from '@seed/shared/ui';

@Component({
  selector: 'seed-provider-setting',
  standalone: true,
  imports: [SharedUiModule, PageContainerComponent],
  templateUrl: './provider-setting.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderSettingComponent {}
