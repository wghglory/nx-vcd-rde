import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedSpecModule } from '@seed/shared/modules';

import { TestUiComponent } from './test-ui.component';

describe('TestUiComponent', () => {
  let component: TestUiComponent;
  let fixture: ComponentFixture<TestUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUiComponent, SharedSpecModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
