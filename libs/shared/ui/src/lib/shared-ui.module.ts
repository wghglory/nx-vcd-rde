import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VIPModule } from '@vmw/ngx-vip';
import { AlertComponent } from 'clr-lift';

import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [SpinnerComponent, AlertComponent],
  exports: [ClarityModule, CommonModule, VIPModule, SpinnerComponent, AlertComponent],
})
export class SharedUiModule {}
