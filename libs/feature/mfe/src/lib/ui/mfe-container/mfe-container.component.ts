import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@seed/shared/modules';
import { RemoteAppCardComponent } from '@seed/shared/ui';
import { of } from 'rxjs';

@Component({
  selector: 'seed-mfe-container',
  templateUrl: './mfe-container.component.html',
  styleUrls: ['./mfe-container.component.scss'],
  standalone: true,
  imports: [RouterModule, SharedModule, RemoteAppCardComponent],
})
export class MfeContainerComponent {
  // TODO: load this from a json File. a generator will update this json
  apps$ = of([{ id: 1, name: 'Shop App', description: 'First Shop remote app', path: '/shop-mfe' }]);
}
