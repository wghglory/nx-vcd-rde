import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedSpecModule } from '@seed/shared/module';
import { VmwThemeToolsModule } from '@vmw/ngx-utils';

import { VerticalNavComponent } from './vertical-nav.component';

describe('VerticalNavComponent', () => {
  let component: VerticalNavComponent;
  let fixture: ComponentFixture<VerticalNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, VerticalNavComponent, VmwThemeToolsModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(VerticalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
