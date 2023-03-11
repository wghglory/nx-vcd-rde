import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '@seed/feature/book/data-access';
import { api } from '@seed/shared/util';
import { switchMap } from 'rxjs';

@Component({
  selector: 'seed-book-detail',
  templateUrl: './book-detail.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailComponent {
  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  book$ = this.route.params.pipe(
    switchMap(({ id }) => this.bookService.getBook(id)),
    api(),
  );
}
