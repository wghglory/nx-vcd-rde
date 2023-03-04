import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '@seed/shared/module';

@Component({
  selector: 'seed-no-access',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './no-access.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoAccessComponent {}
