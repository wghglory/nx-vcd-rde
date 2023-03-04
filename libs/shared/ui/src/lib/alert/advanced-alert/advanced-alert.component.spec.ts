import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedSpecModule } from '@seed/shared/module';
import { L10nService } from '@vmw/ngx-vip';

import { deleteAlert } from '../+state/alerts.actions';
import { selectAlerts } from '../+state/alerts.selectors';
import { AdvancedAlertComponent } from './advanced-alert.component';

describe('AdvancedAlertComponent', () => {
  let component: AdvancedAlertComponent;
  let fixture: ComponentFixture<AdvancedAlertComponent>;
  let store: MockStore;
  let router: Router;
  let l10nService: L10nService;
  const initialState = { alerts: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedAlertComponent],
      imports: [SharedSpecModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    l10nService = TestBed.inject(L10nService);
    store.dispatch = jest.fn();

    fixture = TestBed.createComponent(AdvancedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test alert list', () => {
    component.key = 'test';
    jest.spyOn(l10nService, 'getMessage');
    store.overrideSelector(selectAlerts, [
      { alertKey: 'test', message: 'common.product' },
      { alertKey: 'test', message: 'common.aboutDesc', params: ['1'] },
      { alertKey: 'test', message: 'test alert 3' },
    ]);
    store.refreshState();
    expect(l10nService.getMessage).toHaveBeenCalledWith('common.product', undefined);
    expect(l10nService.getMessage).toHaveBeenCalledWith('common.aboutDesc', ['1']);
    expect(l10nService.getMessage).not.toHaveBeenCalledWith('test alert 3');
  });

  it('should test the onClick', () => {
    jest.spyOn(router, 'navigateByUrl');
    document.body.innerHTML = `<a href="/user" id="test-link"></a>`;
    component.onClick({ target: document.querySelector('#test-link'), preventDefault: () => void 0 });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/user');
  });

  it('should test the onCloseAlert', () => {
    jest.spyOn(store, 'dispatch');
    const id = Symbol('test');
    component.onCloseAlert({ id, message: 'test' });
    expect(store.dispatch).toHaveBeenCalledWith(deleteAlert({ id }));
  });
});
