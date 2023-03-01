import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@seed/shared/module';

import * as fromAlerts from './+state/alerts.reducer';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [SharedModule, StoreModule.forFeature(fromAlerts.ALERTS_FEATURE_KEY, fromAlerts.alertsReducer)],
  declarations: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}
