import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { Product } from '../models/product';
import { ProductStateService } from './product-state.service';

describe('ProductStateService', () => {
  let service: ProductStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('refresh list', () => {
    service.refreshList();

    expect(subscribeSpyTo(service.refreshAction$).getFirstValue()).toBeUndefined();
  });

  it('select item', () => {
    const product = {
      id: 'mockId',
      name: 'mock product',
      description: 'description',
      productionDate: new Date().toISOString(),
    } as Product;

    service.selectItem(product);

    expect(subscribeSpyTo(service.selectedItem$).getFirstValue()).toEqual(product);
  });
});
