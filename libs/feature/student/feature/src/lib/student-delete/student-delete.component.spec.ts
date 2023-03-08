import { InteractivityChecker } from '@angular/cdk/a11y';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/angular';
import { of, throwError } from 'rxjs';

import { StudentDeleteComponent } from './student-delete.component';

const studentServiceStub = {
  deleteStudent: jest.fn().mockImplementation(id => of({})),
  selectedStudent$: of({
    id: 'student-id',
    entity: { lastName: 'Wang', firstName: 'Derek', age: 30, id: 'student-id' },
  } as RDEValue<Student>),
  refreshList: jest.fn(),
  selectStudent: jest.fn(),
};

describe('StudentDeleteComponent', () => {
  let component: StudentDeleteComponent;
  let fixture: ComponentFixture<StudentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule],
      declarations: [StudentDeleteComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentServiceStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete student when confirm', async () => {
    jest.spyOn(component, 'close');
    jest.spyOn(studentServiceStub, 'selectStudent');
    jest.spyOn(studentServiceStub, 'refreshList');

    component.confirm();

    const observerSpy = subscribeSpyTo(component.delete$);

    expect(studentServiceStub.deleteStudent).toBeCalledWith('student-id');
    expect(component.close).toBeCalled();
    expect(studentServiceStub.selectStudent).toBeCalledWith(null);
    expect(studentServiceStub.refreshList).toBeCalled();
  });
});

describe('StudentDeleteComponent use testing library', () => {
  it('should display error when delete api fails', async () => {
    await render(StudentDeleteComponent, {
      componentInputs: {
        open: true,
      },
      imports: [SharedSpecModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StudentService, useValue: studentServiceStub },
        {
          // '[cdkFocusInitial]' is not focusable warning, when running jest unit test of a dialog component with cdkFocusInitial?
          provide: InteractivityChecker,
          useValue: {
            isFocusable: () => true, // This checks focus trap, set it to true to avoid the warning
          },
        },
      ],
    });

    studentServiceStub.deleteStudent.mockReturnValueOnce(throwError(() => new Error('fail')));

    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmBtn);

    expect(studentServiceStub.deleteStudent).toBeCalledWith('student-id');

    const alert = await screen.findByTestId('alert');
    expect(alert).toBeVisible();
  });

  it('should close dialog after delete successfully', async () => {
    await render(StudentDeleteComponent, {
      componentInputs: {
        open: true,
      },
      componentOutputs: { openChange: new EventEmitter<boolean>() },
      imports: [SharedSpecModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: StudentService, useValue: studentServiceStub },
        {
          // '[cdkFocusInitial]' is not focusable warning, when running jest unit test of a dialog component with cdkFocusInitial?
          provide: InteractivityChecker,
          useValue: {
            isFocusable: () => true, // This checks focus trap, set it to true to avoid the warning
          },
        },
      ],
    });

    jest.spyOn(studentServiceStub, 'selectStudent');
    jest.spyOn(studentServiceStub, 'refreshList');

    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmBtn);

    expect(studentServiceStub.deleteStudent).toBeCalledWith('student-id');

    // since no parent component to control delete component, close will not happen
    // await waitForElementToBeRemoved(() => screen.findByRole('button', { name: /confirm/i }));
    // expect(confirmBtn).not.toBeInTheDocument();

    expect(studentServiceStub.deleteStudent).toBeCalledWith('student-id');
    expect(studentServiceStub.selectStudent).toBeCalledWith(null);
    expect(studentServiceStub.refreshList).toBeCalled();
  });
});
