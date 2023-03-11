import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ObserverSpy, queueForAutoUnsubscribe, subscribeSpyTo } from '@hirez_io/observer-spy';
import { BookService } from '@seed/feature/book/data-access';
import { Book } from '@seed/feature/book/model';
import { ApiQuery, RDEList } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  const books1 = {
    resultTotal: 2,
    pageCount: 1,
    page: 1,
    pageSize: 25,
    associations: null,
    values: [
      {
        id: 'uuid-1',
        entityType: 'urn:vcloud:type:vmware:book:1.0.0',
        name: 'test-book',
        externalId: null,
        entity: {
          id: 'uuid-1',
          lastModifiedDate: new Date(),
          state: 'success',
          state_reason: '',
        },
        state: 'RESOLVED',
        owner: {
          name: 'admin',
          id: `urn:vcloud:user:xxxxx`,
        },
        org: { name: 'System', id: 'faker.datatype.uuid()' },
      },
    ],
  } as RDEList<Book>;

  const books2 = {
    resultTotal: 2,
    pageCount: 1,
    page: 1,
    pageSize: 25,
    associations: null,
    values: [
      {
        id: 'uuid-2',
        entityType: 'urn:vcloud:type:vmware:book:1.0.0',
        name: 'test-book',
        externalId: null,
        entity: {
          id: 'uuid-2',
          lastModifiedDate: new Date(),
          state: 'success',
          state_reason: '',
        },
        state: 'RESOLVED',
        owner: {
          name: 'admin',
          id: `urn:vcloud:user:xxxxx`,
        },
        org: { name: 'System', id: 'faker.datatype.uuid()' },
      },
    ],
  } as RDEList<Book>;

  const bookServiceStub = {
    getBookList: jest.fn().mockReturnValue(of(books1, books2)),
    refresh$: of(true),
    selectBook: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule],
      declarations: [BookListComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can refresh datagrid using subscribeSpyTo', fakeAsync(() => {
    const observerSpy = subscribeSpyTo(component.dgState$).getValues();

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    expect(observerSpy[0]).toStrictEqual(state);
  }));

  it('can refresh datagrid using ObserverSpy', fakeAsync(() => {
    const spy = new ObserverSpy();
    const subscription = component.dgState$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    expect(spy.getFirstValue()).toStrictEqual(state);
  }));

  it('can return books when refreshing', fakeAsync(() => {
    const spy = new ObserverSpy();
    const subscription = component.books$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    const apiResult = spy.getLastValue() as ApiQuery<RDEList<Book>>;

    expect(bookServiceStub.getBookList).toBeCalledWith({ page: 2, pageSize: 15 });
    expect(apiResult.data).toBeDefined();
  }));

  it('can return books when refreshing with jest spy', fakeAsync(() => {
    const service = TestBed.inject(BookService);
    const books = { resultTotal: 10 } as RDEList<Book>;
    jest.spyOn(service, 'getBookList').mockReturnValue(of(books));

    const spy = new ObserverSpy();
    const subscription = component.books$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    const apiResult = spy.getLastValue() as ApiQuery<RDEList<Book>>;

    expect(service.getBookList).toBeCalledWith({ page: 2, pageSize: 15 });
    expect(apiResult.data).toBe(books);
  }));

  it('can return error if service fails', fakeAsync(() => {
    const service = TestBed.inject(BookService);
    jest.spyOn(service, 'getBookList').mockReturnValue(throwError(() => new Error('fail')));

    const spy = new ObserverSpy();
    const subscription = component.books$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    const apiResult = spy.getLastValue() as ApiQuery<RDEList<Book>>;

    expect(service.getBookList).toBeCalledWith({ page: 2, pageSize: 15 });
    expect(apiResult.error.message).toEqual('fail');
  }));

  it('should return error alert if service fails', fakeAsync(() => {
    bookServiceStub.getBookList.mockReturnValue(throwError(() => new Error('fail')));

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state); // trigger load data

    tick();
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css(`seed-alert`));
    expect(alert.nativeElement).toBeInTheDocument();
  }));
});
