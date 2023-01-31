import { createAction, props } from '@ngrx/store';

import { Alert } from './alerts.models';

export const addAlert = createAction('[Alert/API] Add Alert', props<{ alert: Alert }>());

export const deleteAlert = createAction('[Alert/API] Delete Alert', props<{ id: symbol }>());

export const clearAlerts = createAction('[Alert/API] Clear Alerts');

export const clearAllErrors = createAction('[Alert/API] Clear All Errors');
