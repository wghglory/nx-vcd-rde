import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MfeLookupService } from '@seed/shared/data-access';
import { PageContainerComponent, RemoteAppCardComponent, SharedUiModule } from '@seed/shared/ui';

@Component({
  selector: 'seed-mfe-container',
  templateUrl: './mfe-container.component.html',
  styleUrls: ['./mfe-container.component.scss'],
  standalone: true,
  imports: [RouterModule, SharedUiModule, PageContainerComponent, RemoteAppCardComponent],
})
export class MfeContainerComponent {
  constructor(private mfeLookupService: MfeLookupService) {}

  mfeApps$ = this.mfeLookupService.mfeApps$;
}
