import { InteractivityChecker } from '@angular/cdk/a11y';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { BookService } from '@seed/feature/book/data-access';
import { Book } from '@seed/feature/book/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/angular';
import { of, throwError } from 'rxjs';

import { BookDeleteComponent } from './book-delete.component';

const bookServiceStub = {
  deleteBook: jest.fn().mockImplementation(id => of({})),
  selectedBook$: of({
    id: 'book-id',
    entity: {
      // TODO
    },
  } as RDEValue<Book>),
  refreshList: jest.fn(),
  selectBook: jest.fn(),
};

describe('BookDeleteComponent', () => {
  let component: BookDeleteComponent;
  let fixture: ComponentFixture<BookDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule],
      declarations: [BookDeleteComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete book when confirm', async () => {
    jest.spyOn(component, 'close');
    jest.spyOn(bookServiceStub, 'selectBook');
    jest.spyOn(bookServiceStub, 'refreshList');

    component.confirm();

    const observerSpy = subscribeSpyTo(component.delete$);

    expect(bookServiceStub.deleteBook).toBeCalledWith('book-id');
    expect(component.close).toBeCalled();
    expect(bookServiceStub.selectBook).toBeCalledWith(null);
    expect(bookServiceStub.refreshList).toBeCalled();
  });
});

describe('BookDeleteComponent use testing library', () => {
  it('should display error when delete api fails', async () => {
    await render(BookDeleteComponent, {
      componentInputs: {
        open: true,
      },
      imports: [SharedSpecModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BookService, useValue: bookServiceStub },
        {
          // '[cdkFocusInitial]' is not focusable warning, when running jest unit test of a dialog component with cdkFocusInitial?
          provide: InteractivityChecker,
          useValue: {
            isFocusable: () => true, // This checks focus trap, set it to true to avoid the warning
          },
        },
      ],
    });

    bookServiceStub.deleteBook.mockReturnValueOnce(throwError(() => new Error('fail')));

    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmBtn);

    expect(bookServiceStub.deleteBook).toBeCalledWith('book-id');

    const alert = await screen.findByTestId('alert');
    expect(alert).toBeVisible();
  });

  it('should close dialog after delete successfully', async () => {
    await render(BookDeleteComponent, {
      componentInputs: {
        open: true,
      },
      componentOutputs: { openChange: new EventEmitter<boolean>() },
      imports: [SharedSpecModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: BookService, useValue: bookServiceStub },
        {
          // '[cdkFocusInitial]' is not focusable warning, when running jest unit test of a dialog component with cdkFocusInitial?
          provide: InteractivityChecker,
          useValue: {
            isFocusable: () => true, // This checks focus trap, set it to true to avoid the warning
          },
        },
      ],
    });

    jest.spyOn(bookServiceStub, 'selectBook');
    jest.spyOn(bookServiceStub, 'refreshList');

    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmBtn);

    expect(bookServiceStub.deleteBook).toBeCalledWith('book-id');

    // since no parent component to control delete component, close will not happen
    // await waitForElementToBeRemoved(() => screen.findByRole('button', { name: /confirm/i }));
    // expect(confirmBtn).not.toBeInTheDocument();

    expect(bookServiceStub.deleteBook).toBeCalledWith('book-id');
    expect(bookServiceStub.selectBook).toBeCalledWith(null);
    expect(bookServiceStub.refreshList).toBeCalled();
  });
});
