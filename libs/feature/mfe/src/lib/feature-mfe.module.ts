import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MfeContainerComponent } from './ui/mfe-container/mfe-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MfeContainerComponent],
  exports: [MfeContainerComponent],
})
export class FeatureMfeModule {}
