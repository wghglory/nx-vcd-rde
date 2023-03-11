import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@seed/feature/book/data-access';
import { api } from '@seed/shared/util';
import { share, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-book-add',
  templateUrl: './book-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAddComponent {
  constructor(public bookService: BookService, private router: Router, private route: ActivatedRoute) {}

  bookForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private saveSubject = new Subject<void>();

  add$ = this.saveSubject.pipe(
    switchMap(() =>
      this.bookService.addBook(this.bookForm.value).pipe(
        api(() => {
          this.cancel();
        }),
      ),
    ),
    share(),
  );

  cancel() {
    this.bookService.selectBook(null);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  save() {
    this.saveSubject.next();
  }
}
