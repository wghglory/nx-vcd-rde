import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '@seed/feature/book/model';
import { PageQuery, RDEList, RDEValue } from '@seed/shared/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  private refreshBS = new BehaviorSubject<void>(undefined);
  refresh$ = this.refreshBS.asObservable();

  private selectedBookBS = new BehaviorSubject<Book | null>(null);
  selectedBook$ = this.selectedBookBS.asObservable();

  refreshList() {
    this.refreshBS.next();
  }

  selectBook(book: Book | null) {
    this.selectedBookBS.next(book);
  }

  getBookList(params: Partial<PageQuery>) {
    return this.http.get<RDEList<Book>>('/api/books', { params });
  }

  getBook(id: string) {
    return this.http.get<RDEValue<Book>>(`/api/books/${id}`);
  }

  addBook(payload: Partial<Book>) {
    return this.http.post<RDEValue<Book>>(`/api/books`, payload);
  }

  updateBook(id: string, payload: Partial<Book>) {
    return this.http.patch<RDEValue<Book>>(`/api/books/${id}`, payload);
  }

  deleteBook(id: string) {
    return this.http.delete<void>(`/api/books/${id}`);
  }
}
