import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Toast } from './toast.model';
import { TOASTS_FEATURE_KEY } from './toast.reducer';

export const selectToastState = createFeatureSelector<Toast[]>(TOASTS_FEATURE_KEY);
