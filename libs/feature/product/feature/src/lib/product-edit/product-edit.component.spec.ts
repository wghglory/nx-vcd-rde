import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { ProductService } from '@seed/feature/product/data-access';
import { Product } from '@seed/feature/product/model';
import { RDEValue } from '@seed/shared/model';
import { SharedSpecModule } from '@seed/shared/module';
import { of, throwError } from 'rxjs';

import { ProductEditComponent } from './product-edit.component';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;
  const productServiceStub = {
    updateProduct: jest.fn(),
    selectedItem$: of({
      id: 'product-id',
      entity: { name: 'test', description: 'test description', id: 'product-id' },
    } as RDEValue<Product>),
    refreshList: jest.fn(),
    selectItem: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditComponent, SharedSpecModule, NoopAnimationsModule],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit product when confirm', async () => {
    const formValue = { name: 'test', description: 'test description' };
    component.productForm.setValue(formValue);

    productServiceStub.updateProduct.mockImplementation(id => of(formValue));

    component.confirm();

    const observerSpy = subscribeSpyTo(component.edit$);

    expect(productServiceStub.updateProduct).toBeCalledWith('product-id', { description: 'test description', name: 'test' });
  });

  it('should catchError if update product fails', () => {
    productServiceStub.updateProduct.mockReturnValueOnce(throwError(() => new Error('fail')));

    component.confirm();

    const observerSpy = subscribeSpyTo(component.error$);

    expect(productServiceStub.updateProduct).toBeCalledWith('product-id', { description: 'test description', name: 'test' });
  });
});
