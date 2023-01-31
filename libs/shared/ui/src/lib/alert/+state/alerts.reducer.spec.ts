import * as alertActions from './alerts.actions';
import { Alert } from './alerts.models';
import { alertsReducer } from './alerts.reducer';

describe('Alert Reducer', () => {
  it('should return the new list', () => {
    const action = alertActions.addAlert({
      alert: {
        alertKey: 'test',
        message: 'test alert',
      },
    });

    const result = alertsReducer([], action);
    expect(result).toHaveLength(1);
  });

  it('should remove the alert', () => {
    const id = Symbol();

    const action = alertActions.deleteAlert({ id });

    const result = alertsReducer(
      [
        {
          id,
          alertKey: 'test',
          message: 'test alert',
          type: 'success',
        },
      ],
      action,
    );

    expect(result).toEqual([]);
  });

  it('should clear all alerts', () => {
    const action = alertActions.clearAlerts();

    const result = alertsReducer(
      [
        {
          id: Symbol(),
          alertKey: 'test',
          message: 'test alert',
          type: 'success',
        },
      ],
      action,
    );

    expect(result).toEqual([]);
  });

  it('should clear all error', () => {
    const action = alertActions.clearAllErrors();

    const id = Symbol();

    const initialState: Alert[] = [
      {
        id,
        alertKey: 'test_success',
        message: 'test alert',
        type: 'success',
      },
      {
        id: Symbol(),
        alertKey: 'test_error',
        message: 'test alert',
        type: 'danger',
      },
      {
        id: Symbol(),
        alertKey: 'test_info',
        message: 'test alert',
        type: 'info',
      },
      {
        id: Symbol(),
        alertKey: 'test_warning',
        message: 'test alert',
        type: 'warning',
      },
    ];

    const result = alertsReducer(initialState, action);

    expect(result.length).toEqual(1);
  });
});
