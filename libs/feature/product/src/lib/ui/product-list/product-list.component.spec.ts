import { fireEvent, render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductStateService } from '../../services/product-state.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  const productServiceStub = {
    products$: of([] as Product[]),
  };

  it('should render', async () => {
    await render(ProductListComponent, {
      componentProperties: {},
      providers: [
        { provide: ProductService, useValue: productServiceStub },
        { provide: ProductStateService, useValue: productServiceStub },
      ],
    });

    const valueControl = screen.getByTestId('value');
    expect(valueControl).toHaveTextContent('0');
  });
});
