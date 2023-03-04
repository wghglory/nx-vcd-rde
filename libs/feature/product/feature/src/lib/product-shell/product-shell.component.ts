import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '@seed/feature/product/data-access';
import { SharedUiModule } from '@seed/shared/ui';

import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductDatagridComponent } from '../product-datagrid/product-datagrid.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductInfiniteScrollComponent } from '../product-infinite-scroll/product-infinite-scroll.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'seed-product-shell',
  standalone: true,
  imports: [
    SharedUiModule,
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
