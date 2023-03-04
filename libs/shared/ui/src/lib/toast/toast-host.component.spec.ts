import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedSpecModule } from '@seed/shared/module';
import { L10nService } from '@vmw/ngx-vip';

import { deleteToast } from './+state/toast.actions';
import { Toast } from './+state/toast.model';
import { selectToastState } from './+state/toast.selectors';
import { ToastHostComponent } from './toast-host.component';

describe('ToastHostComponent', () => {
  let component: ToastHostComponent;
  let fixture: ComponentFixture<ToastHostComponent>;
  let store: MockStore;
  let router: Router;
  let l10nService: L10nService;
  const initialState = { toasts: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastHostComponent],
      imports: [SharedSpecModule, NoopAnimationsModule],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    l10nService = TestBed.inject(L10nService);
    store.dispatch = jest.fn();

    fixture = TestBed.createComponent(ToastHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test toast list', () => {
    jest.spyOn(l10nService, 'getMessage');
    store.overrideSelector(selectToastState, [{ title: 'test', description: 'common.product' }]);
    store.refreshState();
  });

  it('should test the remove', () => {
    jest.spyOn(store, 'dispatch');
    const toast = {} as Toast;
    component.remove(toast);
    expect(store.dispatch).toHaveBeenCalledWith(deleteToast({ toast }));
  });
});
