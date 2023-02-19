import { createAction, props } from '@ngrx/store';

import { Toast } from './toast.model';

export const loadToasts = createAction('[Toast] Load Toasts');

export const addToast = createAction('[Toast/API] Add Toast', props<{ toast: Toast }>());

export const deleteToast = createAction('[Toast/API] Delete Toast', props<{ toast: Toast }>());
