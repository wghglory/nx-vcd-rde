import { animateChild, query, stagger, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';
import { multiply, STAGGER_DURATION } from '@seed/shared/styles';

@Component({
  selector: 'seed-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  animations: [
    trigger('toastContainer', [
      transition(':enter', [query('@launchToast', [stagger(`${multiply(STAGGER_DURATION)}ms`, animateChild())], { optional: true })]),
      transition(':leave', [query('@launchToast', [animateChild()], { optional: true })]),
    ]),
  ],
})
export class ToastContainerComponent {
  @Input() topOffset = 0;

  @HostBinding('style.top')
  get top(): string {
    return 60 + this.topOffset + 'px';
  }
}
