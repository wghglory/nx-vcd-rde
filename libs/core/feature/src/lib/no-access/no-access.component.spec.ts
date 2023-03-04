import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedSpecModule } from '@seed/shared/module';

import { NoAccessComponent } from './no-access.component';

describe('NoAccessComponent', () => {
  let component: NoAccessComponent;
  let fixture: ComponentFixture<NoAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAccessComponent, SharedSpecModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
