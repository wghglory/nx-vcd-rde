import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { VIPModule } from '@vmw/ngx-vip';

import * as fromAlerts from './+state/alerts.reducer';
import { AdvancedAlertComponent } from './advanced-alert/advanced-alert.component';

@NgModule({
  imports: [ClarityModule, CommonModule, VIPModule, StoreModule.forFeature(fromAlerts.ALERTS_FEATURE_KEY, fromAlerts.alertsReducer)],
  declarations: [AdvancedAlertComponent],
  exports: [AdvancedAlertComponent],
})
export class AlertModule {}
