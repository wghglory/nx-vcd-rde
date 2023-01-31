import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { catchError, EMPTY, finalize, Subject, switchMap, tap } from 'rxjs';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'seed-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  templateUrl: './product-add.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent {
  constructor(public productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  productForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
  });

  private saveAction = new Subject<void>();

  private errorSource = new Subject<HttpErrorResponse | null>();
  error$ = this.errorSource.asObservable();
  private loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();

  add$ = this.saveAction.pipe(
    switchMap(() =>
      this.productService.addProduct(this.productForm.value).pipe(
        tap(() => {
          this.goBack();
        }),
        finalize(() => this.loadingSource.next(false)),
        catchError((err) => {
          this.errorSource.next(err);
          return EMPTY;
        })
      )
    )
  );

  save() {
    this.loadingSource.next(true);
    this.errorSource.next(null);
    this.saveAction.next();
  }

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
