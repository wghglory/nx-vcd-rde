import * as fromToast from './toast.reducer';
import { selectToastState } from './toast.selectors';

describe('Toast Selectors', () => {
  it('should select the feature state', () => {
    const result = selectToastState({
      [fromToast.TOASTS_FEATURE_KEY]: {},
    });

    expect(result).toEqual({});
  });
});
