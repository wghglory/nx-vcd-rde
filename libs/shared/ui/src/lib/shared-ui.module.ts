import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VIPModule } from '@vmw/ngx-vip';

import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [SpinnerComponent],
  exports: [ClarityModule, CommonModule, VIPModule, SpinnerComponent],
})
export class SharedUiModule {}
