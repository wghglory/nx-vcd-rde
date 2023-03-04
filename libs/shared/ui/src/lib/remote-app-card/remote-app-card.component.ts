import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { RemoteApp } from './remote-app.model';

@Component({
  selector: 'seed-remote-app-card',
  standalone: true,
  imports: [ClarityModule, CommonModule, RouterModule],
  templateUrl: './remote-app-card.component.html',
  styles: [],
})
export class RemoteAppCardComponent {
  @Input() app = {} as RemoteApp;
}
