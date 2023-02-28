import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@seed/shared/modules';
import { MfeLookupService } from '@seed/shared/services';
import { RemoteAppCardComponent } from '@seed/shared/ui';

@Component({
  selector: 'seed-mfe-container',
  templateUrl: './mfe-container.component.html',
  styleUrls: ['./mfe-container.component.scss'],
  standalone: true,
  imports: [RouterModule, SharedModule, RemoteAppCardComponent],
})
export class MfeContainerComponent {
  constructor(private mfeLookupService: MfeLookupService) {}

  // { name: 'Shop App', path: '/shop-mfe' }
  mfeApps$ = this.mfeLookupService.mfeApps$;
}
