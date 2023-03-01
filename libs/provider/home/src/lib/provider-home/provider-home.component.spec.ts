import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { SharedSpecModule } from '@seed/shared/module';
import { WelcomeComponent } from '@seed/shared/ui';
import { MockComponent } from 'ng-mocks';

import { ProviderHomeComponent } from './provider-home.component';

describe('ProviderHomeComponent', () => {
  let component: ProviderHomeComponent;
  let fixture: ComponentFixture<ProviderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderHomeComponent, ClarityModule, SharedSpecModule, MockComponent(WelcomeComponent)],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
