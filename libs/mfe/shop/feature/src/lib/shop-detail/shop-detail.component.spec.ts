import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopService } from '@seed/mfe/shop/data-access';
import { SharedSpecModule } from '@seed/shared/module';

import { ShopDetailComponent } from './shop-detail.component';

describe('ShopDetailComponent', () => {
  let component: ShopDetailComponent;
  let fixture: ComponentFixture<ShopDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopDetailComponent, SharedSpecModule],
      providers: [ShopService],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
