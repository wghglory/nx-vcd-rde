import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { MfeLookupService } from '@seed/shared/data-access';
import { RemoteAppCardComponent } from '@seed/shared/ui';

@Component({
  selector: 'seed-mfe-container',
  templateUrl: './mfe-container.component.html',
  styleUrls: ['./mfe-container.component.scss'],
  standalone: true,
  imports: [RouterModule, ClarityModule, CommonModule, RemoteAppCardComponent],
})
export class MfeContainerComponent {
  constructor(private mfeLookupService: MfeLookupService) {}

  // { name: 'Shop App', path: '/shop-mfe' }
  mfeApps$ = this.mfeLookupService.mfeApps$;
}
