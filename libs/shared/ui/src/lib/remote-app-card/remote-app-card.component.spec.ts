import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteAppCardComponent } from './remote-app-card.component';

describe('RemoteAppCardComponent', () => {
  let component: RemoteAppCardComponent;
  let fixture: ComponentFixture<RemoteAppCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteAppCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
