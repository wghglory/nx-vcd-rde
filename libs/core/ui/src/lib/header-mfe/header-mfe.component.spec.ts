import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@seed/shared/data-access';
import { SharedSpecModule } from '@seed/shared/module';
import { VmwClarityThemeService, VmwThemeToolsModule } from '@vmw/ngx-utils';

import { HeaderMfeComponent } from './header-mfe.component';

describe('HeaderMfeComponent', () => {
  let component: HeaderMfeComponent;
  let fixture: ComponentFixture<HeaderMfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMfeComponent, SharedSpecModule, VmwThemeToolsModule],
      providers: [AuthService, VmwClarityThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderMfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
