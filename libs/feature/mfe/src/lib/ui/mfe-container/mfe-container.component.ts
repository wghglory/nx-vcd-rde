import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'seed-mfe-container',
  templateUrl: './mfe-container.component.html',
  styleUrls: ['./mfe-container.component.scss'],
})
export class MfeContainerComponent {
  // TODO: load this from a json File. a generator will update this json
  apps$ = of([{ id: 1, name: 'First App', description: 'First remote app', url: 'http://localhost:4301' }]);
}
