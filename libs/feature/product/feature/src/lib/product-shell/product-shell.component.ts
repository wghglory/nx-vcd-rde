import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '@seed/feature/product/data-access';
import {
  ProductCardListComponent,
  ProductDatagridComponent,
  ProductDeleteComponent,
  ProductEditComponent,
  ProductInfiniteScrollComponent,
  ProductListComponent,
} from '@seed/feature/product/ui';
import { SharedModule } from '@seed/shared/module';

@Component({
  selector: 'seed-product-shell',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    FormsModule,
    ProductListComponent,
    ProductCardListComponent,
    ProductDatagridComponent,
    ProductDeleteComponent,
    ProductEditComponent,
    ProductInfiniteScrollComponent,
  ],
  templateUrl: './product-shell.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent {
  constructor(public productService: ProductService) {}

  openDeleteDialog = false;
  openEditDialog = false;
}
