import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { VerticalNavComponent } from '@seed/core/ui';
import { AlertModule } from '@seed/shared/ui';
import { MockComponent, MockModule } from 'ng-mocks';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let store: MockStore;
  const initialState = { alerts: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent(VerticalNavComponent)],
      imports: [RouterTestingModule, MockModule(ClarityModule), MockModule(AlertModule)],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
