import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfeLookupService } from '@seed/shared/data-access';
import { SharedSpecModule } from '@seed/shared/module';

import { MfeContainerComponent } from './mfe-container.component';

describe('MfeContainerComponent', () => {
  let component: MfeContainerComponent;
  let fixture: ComponentFixture<MfeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfeContainerComponent, SharedSpecModule],
      providers: [MfeLookupService],
    }).compileComponents();

    fixture = TestBed.createComponent(MfeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
