import { Action, createReducer, on } from '@ngrx/store';

import * as AlertsActions from './alerts.actions';
import { Alert, GLOBAL } from './alerts.models';

export const ALERTS_FEATURE_KEY = 'alerts';

export interface AlertsPartialState {
  readonly [ALERTS_FEATURE_KEY]: Alert[];
}

const initialState = [] as Alert[];

const reducer = createReducer(
  initialState,
  on(AlertsActions.addAlert, (state, { alert }) => {
    if (state.find(item => item.alertKey === alert.alertKey && item.message === alert.message)) {
      return state;
    } else {
      // by default add a danger global alert
      return [...state, { id: Symbol(), type: 'danger', alertKey: GLOBAL, ...alert }];
    }
  }),
  on(AlertsActions.deleteAlert, (state, { id }) => state.filter(alert => alert.id !== id)),
  on(AlertsActions.clearAlerts, () => initialState),
  on(AlertsActions.clearAllErrors, state => state.filter(alert => alert.type === 'success')),
);

export function alertsReducer(state: Alert[], action: Action) {
  return reducer(state, action);
}
