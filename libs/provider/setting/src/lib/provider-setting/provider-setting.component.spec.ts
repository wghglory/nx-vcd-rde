import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSettingComponent } from './provider-setting.component';

describe('ProviderSettingComponent', () => {
  let component: ProviderSettingComponent;
  let fixture: ComponentFixture<ProviderSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderSettingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
