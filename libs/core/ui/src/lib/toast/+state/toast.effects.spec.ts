import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ToastEffects } from './toast.effects';

describe('ToastEffects', () => {
  let actions$: Observable<any>;
  let effects: ToastEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ToastEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
