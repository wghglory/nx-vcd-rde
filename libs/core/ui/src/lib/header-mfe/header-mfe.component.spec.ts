import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@seed/shared/module';

import { HeaderMfeComponent } from './header-mfe.component';

describe('HeaderMfeComponent', () => {
  let component: HeaderMfeComponent;
  let fixture: ComponentFixture<HeaderMfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMfeComponent, SharedModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderMfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
