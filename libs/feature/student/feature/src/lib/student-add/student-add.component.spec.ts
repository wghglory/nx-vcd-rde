import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { StudentAddComponent } from './student-add.component';

describe('StudentAddComponent', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  const studentServiceStub = {
    addStudent: jest.fn().mockReturnValue(of({ entity: { lastName: 'Wang', firstName: 'Derek', age: 30 } } as RDEValue<Student>)),
  };
  const routerStub = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule],
      declarations: [StudentAddComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentServiceStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return add student', async () => {
    const formValue = { lastName: 'Wang', firstName: 'Derek', age: 30 };
    component.studentForm.setValue(formValue);
    component.save();

    const observerSpy = subscribeSpyTo(component.add$);

    expect(routerStub.navigate).toBeCalled();
    expect(studentServiceStub.addStudent).toBeCalledWith(formValue);
  });

  it('should catchError if add student fails', () => {
    const formValue = { lastName: 'Wang', firstName: 'Derek', age: 30 };
    studentServiceStub.addStudent.mockReturnValueOnce(throwError(() => new Error('fail')));

    component.studentForm.setValue(formValue);
    component.save();

    const observerSpy = subscribeSpyTo(component.add$);

    expect(studentServiceStub.addStudent).toBeCalledWith(formValue);
  });
});
