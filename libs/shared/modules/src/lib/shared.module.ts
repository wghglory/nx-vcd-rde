import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { SharedVipModule } from '@seed/shared/vip';

@NgModule({
  exports: [ClarityModule, CommonModule, SharedVipModule],
})
export class SharedModule {}
