import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { VerticalNavComponent } from '@seed/core/feature';
import { AlertContainerComponent } from 'clr-lift';
import { MockComponent, MockModule } from 'ng-mocks';

import { SidebarLayoutComponent } from './sidebar-layout.component';

describe('SidebarLayoutComponent', () => {
  let component: SidebarLayoutComponent;
  let fixture: ComponentFixture<SidebarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarLayoutComponent,
        MockComponent(VerticalNavComponent),
        MockModule(ClarityModule),
        MockComponent(AlertContainerComponent),
      ],
      imports: [],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
