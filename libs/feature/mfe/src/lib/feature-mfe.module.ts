import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@seed/shared/modules';

import { MfeContainerComponent } from './ui/mfe-container/mfe-container.component';

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [MfeContainerComponent],
  exports: [MfeContainerComponent],
})
export class FeatureMfeModule {}
