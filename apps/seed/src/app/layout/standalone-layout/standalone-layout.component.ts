import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'seed-standalone-layout',
  templateUrl: './standalone-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandaloneLayoutComponent {}
