import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { BookService } from '@seed/feature/book/data-access';
import { Book } from '@seed/feature/book/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { BookAddComponent } from './book-add.component';

describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;

  const bookServiceStub = {
    addBook: jest.fn().mockReturnValue(of({ entity: { name: 'Book name' } } as RDEValue<Book>)),
    selectBook: jest.fn(),
  };
  const routerStub = { navigate: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule],
      declarations: [BookAddComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return add book', async () => {
    const formValue = { name: 'Book name' };

    const observerSpy = subscribeSpyTo(component.add$);

    component.bookForm.setValue(formValue);
    component.save();

    expect(observerSpy.getLastValue()).toStrictEqual({
      data: { entity: formValue },
      error: null,
      loading: false,
    });

    expect(routerStub.navigate).toBeCalled();
    expect(bookServiceStub.addBook).toBeCalledWith(formValue);
  });

  it('should catchError if add book fails', () => {
    const formValue = { name: 'Book name' };
    bookServiceStub.addBook.mockReturnValueOnce(throwError(() => new Error('fail')));

    const observerSpy = subscribeSpyTo(component.add$);

    component.bookForm.setValue(formValue);
    component.save();

    expect(observerSpy.getLastValue()).toStrictEqual({
      data: null,
      error: Error('fail'),
      loading: false,
    });

    expect(bookServiceStub.addBook).toBeCalledWith(formValue);
  });
});
