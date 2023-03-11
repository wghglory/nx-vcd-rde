import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@seed/feature/book/data-access';
import { api } from '@seed/shared/util';
import { filter, share, Subject, switchMap, take } from 'rxjs';

@Component({
  selector: 'seed-book-edit',
  templateUrl: './book-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookEditComponent implements OnInit {
  constructor(public bookService: BookService, private router: Router, private route: ActivatedRoute) {}

  bookForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private saveSubject = new Subject<void>();

  edit$ = this.saveSubject.pipe(
    switchMap(() => this.bookService.selectedBook$.pipe(filter(Boolean))),
    switchMap(book => {
      return this.bookService.updateBook(book.id, this.bookForm.value).pipe(
        api(() => {
          this.cancel();
        }),
      );
    }),
    share(),
  );

  cancel() {
    this.bookService.selectBook(null);
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }

  save() {
    this.saveSubject.next();
  }

  ngOnInit() {
    // init form
    this.bookService.selectedBook$.pipe(filter(Boolean), take(1)).subscribe(book => {
      this.bookForm.setValue({
        name: book.name,
      });
    });
  }
}
