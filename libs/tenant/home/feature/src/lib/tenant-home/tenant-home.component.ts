import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WelcomeComponent } from '@seed/shared/ui';

@Component({
  selector: 'seed-tenant-home',
  standalone: true,
  imports: [CommonModule, WelcomeComponent],
  templateUrl: './tenant-home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantHomeComponent {}
