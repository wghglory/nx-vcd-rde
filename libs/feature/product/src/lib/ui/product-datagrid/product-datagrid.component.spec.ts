import { ComponentFixture, TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { RDEList } from '@seed/shared/models';
import { SharedSpecModule } from '@seed/shared/modules';
import { of } from 'rxjs';

import { Product } from '../../models/product';
import { ProductService } from './../../services/product.service';
import { ProductDatagridComponent } from './product-datagrid.component';

describe('ProductDatagridComponent', () => {
  let component: ProductDatagridComponent;
  let fixture: ComponentFixture<ProductDatagridComponent>;

  const products1 = {
    resultTotal: 2,
    pageCount: 1,
    page: 1,
    pageSize: 25,
    associations: null,
    values: [
      {
        id: '12',
        entityType: 'urn:vcloud:type:vmware:product:1.0.0',
        name: 'test-product',
        externalId: null,
        entity: {
          id: '12',
          name: 'test-product',
          description: 'test-product',
          productionDate: new Date().toISOString(),
          state: 'success',
          state_reason: '',
        },
        state: 'RESOLVED',
        owner: {
          name: 'admin',
          id: `urn:vcloud:user:xxxxx`,
        },
        org: { name: 'System', id: 'faker.datatype.uuid()' },
      },
    ],
  } as RDEList<Product>;

  const products2 = {
    resultTotal: 2,
    pageCount: 1,
    page: 1,
    pageSize: 25,
    associations: null,
    values: [
      {
        id: '22',
        entityType: 'urn:vcloud:type:vmware:product:1.0.0',
        name: 'test-product',
        externalId: null,
        entity: {
          id: '22',
          name: 'test-product 2',
          description: 'test-product 2',
          productionDate: new Date().toISOString(),
          state: 'success',
          state_reason: '',
        },
        state: 'RESOLVED',
        owner: {
          name: 'admin',
          id: `urn:vcloud:user:xxxxx`,
        },
        org: { name: 'System', id: 'faker.datatype.uuid()' },
      },
    ],
  } as RDEList<Product>;

  const productServiceStub = {
    getProducts: jest.fn().mockReturnValue(of(products1, products2)),
    refreshAction$: of(true),
    selectItem: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDatagridComponent, SharedSpecModule],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can refresh datagrid', () => {
    const state1 = {
      page: { from: 1, to: 15, size: 15, current: 2 },
    };
    const state2 = {
      page: { from: 16, to: 30, size: 15, current: 3 },
    };
    component.refresh(state1);
    component.refresh(state2);

    const result = subscribeSpyTo(component.dgState$).getLastValue();
    // expect(result).toStrictEqual(state2); // TODO: debounce timer, pairwise..
  });
});
