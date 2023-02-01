import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedSpecModule } from '@seed/shared/modules';

import { ProductCardListComponent } from './product-card-list.component';

describe('ProductCardListComponent', () => {
  let component: ProductCardListComponent;
  let fixture: ComponentFixture<ProductCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardListComponent, SharedSpecModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
