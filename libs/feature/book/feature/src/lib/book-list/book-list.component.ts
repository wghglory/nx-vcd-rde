import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { BookService } from '@seed/feature/book/data-access';
import { Book } from '@seed/feature/book/model';
import { ApiQuery, RDEList } from '@seed/shared/model';
import { api, dgState, stateHandler } from '@seed/shared/util';
import { BehaviorSubject, combineLatest, filter, map, Observable, share, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'seed-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  constructor(public bookService: BookService) {}

  openDeleteDialog = false;

  selectedBook: Book | undefined;

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(dgState());

  books$: Observable<ApiQuery<RDEList<Book>>> = combineLatest([this.dgState$, this.bookService.refresh$]).pipe(
    switchMap(([state]) => {
      const params = stateHandler(state);
      return this.bookService.getBookList(params).pipe(api());
    }),
    startWith({ loading: true, error: null, data: null }), // used to trigger the first render of datagrid.
    share(),
  );

  total$ = this.books$.pipe(
    filter(s => Boolean(s.data)),
    map(res => res.data?.resultTotal),
  );

  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
