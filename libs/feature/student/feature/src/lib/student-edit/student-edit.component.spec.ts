import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { StudentEditComponent } from './student-edit.component';

describe('StudentEditComponent', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;
  const studentServiceStub = {
    updateStudent: jest.fn(),
    selectedItem$: of({
      id: 'student-id',
      entity: { lastName: 'Wang', firstName: 'Derek', age: 30, id: 'student-id' },
    } as RDEValue<Student>),
    refreshList: jest.fn(),
    selectItem: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule],
      declarations: [StudentEditComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentServiceStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit student when confirm', async () => {
    const formValue = { lastName: 'Wang', firstName: 'Derek', age: 30 };
    component.studentForm.setValue(formValue);

    studentServiceStub.updateStudent.mockImplementation(id => of(formValue));

    component.save();

    const observerSpy = subscribeSpyTo(component.edit$);

    expect(studentServiceStub.updateStudent).toBeCalledWith('student-id', formValue);
  });

  it('should catchError if update student fails', () => {
    const formValue = { lastName: 'Wang', firstName: 'Derek', age: 30 };
    component.studentForm.setValue(formValue);
    studentServiceStub.updateStudent.mockReturnValueOnce(throwError(() => new Error('fail')));

    component.save();

    const observerSpy = subscribeSpyTo(component.edit$);

    expect(studentServiceStub.updateStudent).toBeCalledWith('student-id', formValue);
  });
});
