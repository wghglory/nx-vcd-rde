import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSettingComponent } from './tenant-setting.component';

describe('TenantSettingComponent', () => {
  let component: TenantSettingComponent;
  let fixture: ComponentFixture<TenantSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantSettingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
