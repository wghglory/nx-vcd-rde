import { Action, createReducer, on } from '@ngrx/store';

import * as ToastActions from './toast.actions';
import { Toast, ToastType } from './toast.model';

export const TOASTS_FEATURE_KEY = 'toasts';

export interface ToastsPartialState {
  readonly [TOASTS_FEATURE_KEY]: Toast[];
}

export const initialState = [] as Toast[];

export const reducer = createReducer(
  initialState,

  on(ToastActions.loadToasts, state => state),

  on(ToastActions.addToast, (state, { toast }) => {
    const newToast = { dismissible: true, type: ToastType.SUCCESS, timeoutSeconds: 6, ...toast };
    return [...state, newToast];
  }),

  on(ToastActions.deleteToast, (state, { toast }) => state.filter(t => toast.title !== t.title && toast.description != t.description)),
);

export function toastReducer(state: Toast[], action: Action) {
  return reducer(state, action);
}
