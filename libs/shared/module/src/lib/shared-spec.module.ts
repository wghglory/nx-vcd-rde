import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { SharedVipSpecModule } from '@seed/shared/vip';

/**
 * NgModule as workaround for "Navigation triggered outside Angular zone" in tests
 *
 * https://github.com/angular/angular/issues/47236
 */
@NgModule()
export class FixNavigationTriggeredOutsideAngularZoneNgModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(_router: Router) {}
}

@NgModule({
  imports: [],
  exports: [
    RouterTestingModule,
    HttpClientTestingModule,
    CommonModule,
    SharedVipSpecModule,
    ClarityModule,
    FixNavigationTriggeredOutsideAngularZoneNgModule,
  ],
})
export class SharedSpecModule {}
