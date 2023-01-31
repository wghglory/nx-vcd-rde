import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'seed-provider-setting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-setting.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderSettingComponent {}
