import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from '@seed/feature/book/data-access';
import { api } from '@seed/shared/util';
import { filter, share, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-book-delete',
  templateUrl: './book-delete.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDeleteComponent {
  constructor(public bookService: BookService) {}

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveSubject = new Subject<void>();

  delete$ = this.saveSubject.pipe(
    switchMap(() => this.bookService.selectedBook$.pipe(filter(Boolean))),
    switchMap(book =>
      this.bookService.deleteBook(book.id).pipe(
        api(() => {
          this.close();
          this.bookService.refreshList();
        }),
      ),
    ),
    share(), // cannot use shareReplay as it will replay the delete when selecting an item
  );

  close() {
    this.bookService.selectBook(null);
    this.openChange.emit(false);
  }

  confirm() {
    this.saveSubject.next();
  }
}
