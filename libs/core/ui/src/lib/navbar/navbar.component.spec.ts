import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedSpecModule } from '@seed/shared/module';
import { VmwClarityThemeService, VmwThemeToolsModule } from '@vmw/ngx-utils';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NavbarComponent, VmwThemeToolsModule],
      providers: [VmwClarityThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
