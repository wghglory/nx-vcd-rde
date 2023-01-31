import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'seed-tenant-setting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tenant-setting.component.html',
  styleUrls: ['./tenant-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantSettingComponent {}
