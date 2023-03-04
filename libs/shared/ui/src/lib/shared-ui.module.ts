import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VIPModule } from '@vmw/ngx-vip';

import { AlertComponent } from './alert';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [AlertComponent, SpinnerComponent],
  exports: [ClarityModule, CommonModule, VIPModule, AlertComponent, SpinnerComponent],
})
export class SharedUiModule {}
