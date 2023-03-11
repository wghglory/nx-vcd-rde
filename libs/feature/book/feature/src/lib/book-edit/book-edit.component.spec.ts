import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { BookService } from '@seed/feature/book/data-access';
import { Book } from '@seed/feature/book/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { BookEditComponent } from './book-edit.component';

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;
  const bookServiceStub = {
    updateBook: jest.fn(),
    selectedBook$: of({
      id: 'book-id',
      entity: { name: 'Updated Name', id: 'book-id' },
    } as RDEValue<Book>),
    refreshList: jest.fn(),
    selectBook: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule],
      declarations: [BookEditComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit book when confirm', async () => {
    const formValue = { name: 'Updated Name' };
    component.bookForm.setValue(formValue);

    bookServiceStub.updateBook.mockImplementation(id => of(formValue));

    component.save();

    const observerSpy = subscribeSpyTo(component.edit$);

    expect(bookServiceStub.updateBook).toBeCalledWith('book-id', formValue);
  });

  it('should catchError if update book fails', () => {
    const formValue = { name: 'Updated Name' };
    component.bookForm.setValue(formValue);
    bookServiceStub.updateBook.mockReturnValueOnce(throwError(() => new Error('fail')));

    component.save();

    const observerSpy = subscribeSpyTo(component.edit$);

    expect(bookServiceStub.updateBook).toBeCalledWith('book-id', formValue);
  });
});
