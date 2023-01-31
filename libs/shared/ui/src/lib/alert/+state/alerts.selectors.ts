import { createFeatureSelector } from '@ngrx/store';

import { Alert } from './alerts.models';
import { ALERTS_FEATURE_KEY } from './alerts.reducer';

// Lookup the 'Alerts' feature state managed by NgRx
export const selectAlerts = createFeatureSelector<Alert[]>(ALERTS_FEATURE_KEY);
