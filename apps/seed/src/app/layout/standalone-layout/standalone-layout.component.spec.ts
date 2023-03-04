import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { NavbarComponent } from '@seed/core/feature';
import { AlertModule } from '@seed/shared/ui';
import { MockComponent, MockModule } from 'ng-mocks';

import { StandaloneLayoutComponent } from './standalone-layout.component';

describe('StandaloneLayoutComponent', () => {
  let component: StandaloneLayoutComponent;
  let fixture: ComponentFixture<StandaloneLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StandaloneLayoutComponent, MockComponent(NavbarComponent), MockModule(ClarityModule), MockModule(AlertModule)],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
