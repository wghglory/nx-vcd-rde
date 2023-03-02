import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SharedSpecModule } from '@seed/shared/module';
import { MockComponent } from 'ng-mocks';

import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductDatagridComponent } from '../product-datagrid/product-datagrid.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductInfiniteScrollComponent } from '../product-infinite-scroll/product-infinite-scroll.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductShellComponent } from './product-shell.component';

describe('ProductShellComponent', () => {
  let component: ProductShellComponent;
  let fixture: ComponentFixture<ProductShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedSpecModule,
        FormsModule,
        MockComponent(ProductListComponent),
        MockComponent(ProductCardListComponent),
        MockComponent(ProductDatagridComponent),
        MockComponent(ProductDeleteComponent),
        MockComponent(ProductEditComponent),
        MockComponent(ProductInfiniteScrollComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
