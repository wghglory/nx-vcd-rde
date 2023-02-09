import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { RDEValue } from '@seed/shared/models';
import { SharedSpecModule } from '@seed/shared/modules';
import { of, throwError } from 'rxjs';

import { Product } from '../../models/product';
import { ProductService } from './../../services/product.service';
import { ProductDeleteComponent } from './product-delete.component';

describe('ProductDeleteComponent', () => {
  let component: ProductDeleteComponent;
  let fixture: ComponentFixture<ProductDeleteComponent>;
  const productServiceStub = {
    deleteProduct: jest.fn().mockImplementation(id => of({})),
    selectedItem$: of({
      id: 'product-id',
      entity: { name: 'test', description: 'test description', id: 'product-id' },
    } as RDEValue<Product>),
    refreshList: jest.fn(),
    selectItem: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDeleteComponent, SharedSpecModule, NoopAnimationsModule],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceStub,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete product when confirm', async () => {
    component.confirm();

    const observerSpy = subscribeSpyTo(component.delete$);

    expect(productServiceStub.deleteProduct).toBeCalledWith('product-id');

    // expect(observerSpy.getValues()).toBe({ name: '1' }); // TODO
  });

  it('should catchError if delete product fails', () => {
    productServiceStub.deleteProduct.mockReturnValueOnce(throwError(() => new Error('fail')));

    component.confirm();

    const observerSpy = subscribeSpyTo(component.error$);

    expect(productServiceStub.deleteProduct).toBeCalledWith('product-id');

    // expect(observerSpy.getValues()).toBe({ name: '1' }); // TODO
  });
});
