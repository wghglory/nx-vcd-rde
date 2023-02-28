import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMfeComponent } from './header-mfe.component';

describe('HeaderMfeComponent', () => {
  let component: HeaderMfeComponent;
  let fixture: ComponentFixture<HeaderMfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMfeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderMfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
