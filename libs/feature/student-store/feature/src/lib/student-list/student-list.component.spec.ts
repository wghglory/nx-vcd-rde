import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Student } from '@seed/feature/student/model';
import { RDEList } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of } from 'rxjs';

import { StudentListComponent } from './student-list.component';
import { StudentListStore } from './student-list.store';

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

  const studentListStoreStub = {
    getStudentList: jest.fn().mockReturnValue(of(students1, students2)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule],
      declarations: [StudentListComponent],
      providers: [
        {
          provide: StudentListStore,
          useValue: studentListStoreStub,
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
});
