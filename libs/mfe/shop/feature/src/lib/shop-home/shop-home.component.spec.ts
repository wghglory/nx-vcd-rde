import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '@seed/shared/data-access';
import { SharedSpecModule } from '@seed/shared/module';

import { ShopHomeComponent } from './shop-home.component';

describe('ShopHomeComponent', () => {
  let component: ShopHomeComponent;
  let fixture: ComponentFixture<ShopHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopHomeComponent, SharedSpecModule],
      providers: [AuthService, provideMockStore({ initialState: { alerts: [] } })],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
