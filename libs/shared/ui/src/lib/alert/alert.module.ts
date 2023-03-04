import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@seed/shared/module';

import * as fromAlerts from './+state/alerts.reducer';
import { AdvancedAlertComponent } from './advanced-alert/advanced-alert.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [SharedModule, StoreModule.forFeature(fromAlerts.ALERTS_FEATURE_KEY, fromAlerts.alertsReducer)],
  declarations: [AdvancedAlertComponent, AlertComponent],
  exports: [AdvancedAlertComponent, AlertComponent],
})
export class AlertModule {}
