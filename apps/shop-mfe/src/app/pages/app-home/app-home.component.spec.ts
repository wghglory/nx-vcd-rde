import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeComponent } from './app-home.component';

describe('AppHomeComponent', () => {
  let component: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
