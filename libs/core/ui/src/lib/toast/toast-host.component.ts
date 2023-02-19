import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { deleteToast } from './+state/toast.actions';
import { Toast } from './+state/toast.model';
import { selectToastState } from './+state/toast.selectors';

@Component({
  selector: 'seed-toast-host',
  templateUrl: './toast-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      p.toast-description {
        word-break: break-word;
      }
    `,
  ],
})
export class ToastHostComponent {
  constructor(private store: Store<{ toast: Toast[] }>) {}

  toasts$ = this.store.select(selectToastState);

  remove(toast: Toast) {
    this.store.dispatch(deleteToast({ toast }));
  }
}
