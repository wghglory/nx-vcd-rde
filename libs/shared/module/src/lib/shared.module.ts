import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VIPModule } from '@vmw/ngx-vip';

@NgModule({
  exports: [ClarityModule, CommonModule, VIPModule],
})
export class SharedModule {}
