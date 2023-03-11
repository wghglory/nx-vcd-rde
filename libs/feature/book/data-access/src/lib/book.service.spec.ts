import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Book } from '@seed/feature/book/model';
import { RDEList, RDEValue } from '@seed/shared/model';

import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get books', () => {
    service.getBookList({ page: 1 }).subscribe();

    const request = controller.expectOne(req => req.method === 'GET' && req.url.includes('api/books'));

    // Assert that the request is a GET.
    expect(request.request.method).toEqual('GET');

    const data = {
      resultTotal: 1,
      pageCount: 1,
      page: 1,
      pageSize: 10,
      associations: [],
      values: [
        {
          entity: {
            // TODO
          },
        },
      ],
    } as RDEList<Book>;
    request.flush(data);
  });

  it('get single book', () => {
    service.getBook('mockId').subscribe();

    const request = controller.expectOne(req => req.method === 'GET' && req.url.includes('api/books/mockId'));

    // Assert that the request is a GET.
    expect(request.request.method).toEqual('GET');
    request.flush({
      entity: {
        id: 'mockId',
        // TODO
      },
    } as RDEValue<Book>);
  });

  it('add a book', () => {
    const payload = {}; // TODO
    service.addBook(payload).subscribe();

    const request = controller.expectOne(req => req.method === 'POST' && req.url.includes('api/books'));

    // Assert that the request is a POST.
    expect(request.request.method).toEqual('POST');
    request.flush({
      entity: payload,
    } as RDEValue<Book>);
  });

  it('delete a book', () => {
    service.deleteBook('mockId').subscribe();

    const request = controller.expectOne(req => req.method === 'DELETE' && req.url.includes('api/books/mockId'));

    // Assert that the request is a DELETE.
    expect(request.request.method).toEqual('DELETE');
    request.flush(null);
  });

  it('update a book', () => {
    const payload = {}; // TODO
    service.updateBook('mockId', payload).subscribe();

    const request = controller.expectOne(req => req.method === 'PATCH' && req.url.includes('api/books/mockId'));

    // Assert that the request is a PATCH.
    expect(request.request.method).toEqual('PATCH');
    request.flush({
      entity: payload,
    } as RDEValue<Book>);
  });

  it('refresh list', () => {
    service.refreshList();

    expect(subscribeSpyTo(service.refresh$).getFirstValue()).toBeUndefined();
  });

  it('select book', () => {
    const book = {
      id: 'mockId',
      // TODO
    } as Book;

    service.selectBook(book);

    expect(subscribeSpyTo(service.selectedBook$).getFirstValue()).toEqual(book);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    controller.verify();
  });
});
