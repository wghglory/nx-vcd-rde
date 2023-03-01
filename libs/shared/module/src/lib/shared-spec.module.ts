import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { SharedVipSpecModule } from '@seed/shared/vip';

@NgModule({
  imports: [],
  exports: [RouterTestingModule, HttpClientTestingModule, CommonModule, SharedVipSpecModule, ClarityModule],
})
export class SharedSpecModule {}
