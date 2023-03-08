import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@seed/feature/product/data-access';
import { PageContainerComponent, SharedUiModule } from '@seed/shared/ui';
import { catchError, EMPTY, finalize, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'seed-product-add',
  standalone: true,
  imports: [SharedUiModule, PageContainerComponent, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  constructor(public productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  productForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  private saveSubject = new Subject<void>();

  private errorSubject = new Subject<HttpErrorResponse | null>();
  error$ = this.errorSubject.asObservable();
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  add$ = this.saveSubject.pipe(
    switchMap(() =>
      this.productService.addProduct(this.productForm.value).pipe(
        tap(() => this.goBack()),
        finalize(() => this.loadingSubject.next(false)),
        catchError(err => {
          this.errorSubject.next(err);
          return EMPTY;
        }),
      ),
    ),
  );

  save() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.saveSubject.next();
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
