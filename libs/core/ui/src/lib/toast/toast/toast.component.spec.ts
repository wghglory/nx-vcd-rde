import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedSpecModule } from '@seed/shared/module';
import { VmwSimpleTranslateModule } from '@vmw/ngx-utils';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSpecModule, NoopAnimationsModule, VmwSimpleTranslateModule],
      declarations: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
