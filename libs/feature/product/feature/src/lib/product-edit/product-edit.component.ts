import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', {
      nonNullable: true,
    }),
  });

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveAction = new Subject<void>();

  private errorSource = new Subject<HttpErrorResponse | null>();
  error$ = this.errorSource.asObservable();
  private loadingSource = new Subject<boolean>();
  loading$ = this.loadingSource.asObservable();

  edit$ = combineLatest([this.productService.selectedItem$.pipe(filter(Boolean)), this.saveAction]).pipe(
    switchMap(([product, _]) => {
      return this.productService.updateProduct(product.id, this.productForm.value).pipe(
        finalize(() => this.loadingSource.next(false)),
        catchError(err => {
          this.errorSource.next(err);
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
    this.loadingSource.next(true);
    this.errorSource.next(null);
    this.saveAction.next();
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
