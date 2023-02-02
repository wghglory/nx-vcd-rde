import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedSpecModule } from '@seed/shared/modules';
import { VmwClarityThemeService, VmwThemeToolsModule } from '@vmw/ngx-utils';

import { VerticalNavComponent } from './vertical-nav.component';

describe('VerticalNavComponent', () => {
  let component: VerticalNavComponent;
  let fixture: ComponentFixture<VerticalNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, VerticalNavComponent, RouterTestingModule, VmwThemeToolsModule],
      providers: [VmwClarityThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
