import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@seed/feature/product/data-access';
import { SharedUiModule } from '@seed/shared/ui';
import { catchError, combineLatest, EMPTY, filter, finalize, Subject, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'seed-product-edit',
  standalone: true,
  imports: [SharedUiModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
  constructor(private productService: ProductService) {}

  productForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveSubject = new Subject<void>();

  private errorSubject = new Subject<HttpErrorResponse | null>();
  error$ = this.errorSubject.asObservable();
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  edit$ = combineLatest([this.productService.selectedItem$.pipe(filter(Boolean)), this.saveSubject]).pipe(
    switchMap(([product, _]) => {
      return this.productService.updateProduct(product.id, this.productForm.value).pipe(
        finalize(() => this.loadingSubject.next(false)),
        catchError(err => {
          this.errorSubject.next(err);
          return EMPTY;
        }),
      );
    }),
    tap(() => {
      // delete successful actions
      this.close();
      this.productService.selectItem(null);
      this.productService.refreshList();
    }),
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.saveSubject.next();
  }

  ngOnInit() {
    // init form
    this.productService.selectedItem$.pipe(filter(Boolean), take(1)).subscribe(product => {
      this.productForm.setValue({
        name: product.name,
        description: product.description,
      });
    });
  }
}
