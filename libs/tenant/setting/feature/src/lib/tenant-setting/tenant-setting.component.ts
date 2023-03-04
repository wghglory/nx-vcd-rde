import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageContainerComponent, SharedUiModule } from '@seed/shared/ui';

@Component({
  selector: 'seed-tenant-setting',
  standalone: true,
  imports: [SharedUiModule, PageContainerComponent],
  templateUrl: './tenant-setting.component.html',
  styleUrls: ['./tenant-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantSettingComponent {}
