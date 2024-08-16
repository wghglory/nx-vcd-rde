import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ObserverSpy, queueForAutoUnsubscribe, subscribeSpyTo } from '@hirez_io/observer-spy';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { ApiQuery, RDEList } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { StudentListComponent } from './student-list.component';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  const students1 = {
    resultTotal: 2,
    pageCount: 1,
    page: 1,
    pageSize: 25,
    associations: null,
    values: [
      {
        id: '12',
        entityType: 'urn:vcloud:type:vmware:student:1.0.0',
        name: 'test-student',
        externalId: null,
        entity: {
          id: '12',
          lastName: 'Wang',
          firstName: 'Derek',
          age: 30,
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
  } as RDEList<Student>;

  const students2 = {
    resultTotal: 2,
    pageCount: 1,
    page: 1,
    pageSize: 25,
    associations: null,
    values: [
      {
        id: '20',
        entityType: 'urn:vcloud:type:vmware:student:1.0.0',
        name: 'test-student',
        externalId: null,
        entity: {
          id: '20',
          lastName: 'Yuan',
          firstName: 'Iris',
          age: 20,
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
  } as RDEList<Student>;

  const studentServiceStub = {
    getStudentList: jest.fn().mockReturnValue(of(students1, students2)),
    refresh$: of(true),
    selectStudent: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule],
      declarations: [StudentListComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListComponent);
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

  it('can return students when refreshing', fakeAsync(() => {
    const spy = new ObserverSpy();
    const subscription = component.students$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    const apiResult = spy.getLastValue() as ApiQuery<RDEList<Student>>;

    expect(studentServiceStub.getStudentList).toBeCalledWith({ page: 2, pageSize: 15 });
    expect(apiResult.data).toBeDefined();
  }));

  it('can return students when refreshing with jest spy', fakeAsync(() => {
    const service = TestBed.inject(StudentService);
    const students = { resultTotal: 10 } as RDEList<Student>;
    jest.spyOn(service, 'getStudentList').mockReturnValue(of(students));

    const spy = new ObserverSpy();
    const subscription = component.students$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    const apiResult = spy.getLastValue() as ApiQuery<RDEList<Student>>;

    expect(service.getStudentList).toBeCalledWith({ page: 2, pageSize: 15 });
    expect(apiResult.data).toBe(students);
  }));

  it('can return error if service fails', fakeAsync(() => {
    const service = TestBed.inject(StudentService);
    jest.spyOn(service, 'getStudentList').mockReturnValue(throwError(() => new Error('fail')));

    const spy = new ObserverSpy();
    const subscription = component.students$.subscribe(spy);
    queueForAutoUnsubscribe(subscription);

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state);

    tick();

    const apiResult = spy.getLastValue() as ApiQuery<RDEList<Student>>;

    expect(service.getStudentList).toBeCalledWith({ page: 2, pageSize: 15 });
    expect(apiResult.error.message).toEqual('fail');
  }));

  it('should return error alert if service fails', fakeAsync(() => {
    studentServiceStub.getStudentList.mockReturnValue(throwError(() => new Error('fail')));

    const state = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    component.refresh(state); // trigger load data

    tick();
    fixture.detectChanges();

    const alert = fixture.debugElement.query(By.css(`cll-alert`));
    expect(alert.nativeElement).toBeInTheDocument();
  }));
});
