import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeContainerComponent } from './mfe-container.component';

describe('MfeContainerComponent', () => {
  let component: MfeContainerComponent;
  let fixture: ComponentFixture<MfeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MfeContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
