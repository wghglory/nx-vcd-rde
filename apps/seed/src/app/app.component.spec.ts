import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '@seed/shared/data-access';
import { SharedSpecModule } from '@seed/shared/module';
import { AlertModule } from '@seed/shared/ui';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let store: MockStore;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const initialState = { alerts: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MockModule(ClarityModule), MockModule(AlertModule), SharedSpecModule],
      providers: [
        AuthService,
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: { events: of(new NavigationEnd(1, '/provider/home', '/')) },
        },
        {
          provide: ActivatedRoute,
          useValue: { outlet: 'primary', data: of({ layout: 'sidebar' }) },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return layout$ as sidebar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const observerSpy = subscribeSpyTo(app.layout$);

    expect(observerSpy.getLastValue()).toBe('sidebar');
  });
});
