import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@seed/shared/module';

import { RemoteApp } from './remote-app.model';

@Component({
  selector: 'seed-remote-app-card',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './remote-app-card.component.html',
  styles: [],
})
export class RemoteAppCardComponent {
  @Input() app!: RemoteApp;
}
