import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WelcomeComponent } from '@seed/shared/ui';

@Component({
  selector: 'seed-provider-home',
  standalone: true,
  imports: [CommonModule, WelcomeComponent],
  templateUrl: './provider-home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderHomeComponent {}
