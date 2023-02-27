import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopHomeComponent } from './shop-home.component';

describe('ShopHomeComponent', () => {
  let component: ShopHomeComponent;
  let fixture: ComponentFixture<ShopHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
