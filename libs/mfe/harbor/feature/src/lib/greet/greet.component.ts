import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'seed-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetComponent {}
