import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'seed-test-ui',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './test-ui.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestUiComponent {}
