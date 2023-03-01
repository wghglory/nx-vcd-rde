import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DOMAIN_REGEX } from '@seed/shared/util';
import { L10nService } from '@vmw/ngx-vip';
import { map } from 'rxjs';

import { deleteAlert } from './+state/alerts.actions';
import { Alert, GLOBAL } from './+state/alerts.models';
import { selectAlerts } from './+state/alerts.selectors';

@Component({
  selector: 'seed-alert',
  templateUrl: './alert.component.html',
  styles: [
    `
      :host {
        ::ng-deep .alert-text {
          a {
            text-decoration: underline;
            color: white;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  constructor(private store: Store<{ alerts: Alert[] }>, private l10nService: L10nService, private router: Router) {}

  @Input() key = GLOBAL;

  alerts$ = this.store.select(selectAlerts).pipe(
    map(alerts => alerts.filter(item => item.alertKey === this.key)),
    map(filteredAlerts =>
      filteredAlerts.map(alert => {
        let message = alert.message;
        const params = alert.params;
        // If not have space, passing l10n key as message, try to translate it.
        if (!message.includes(' ') && this.l10nService.getMessage(message, params) !== message) {
          message = this.l10nService.getMessage(message, params);
        }

        return {
          ...alert,
          message,
        };
      }),
    ),
  );

  onCloseAlert({ id }: Alert) {
    if (id) {
      this.store.dispatch(deleteAlert({ id }));
    } else {
      throw new Error('no alert id provided');
    }
  }

  /**
   * alert message could be a href which jumps internally.
   * like: <a href="/user">User</a> will internally jump to user route
   */
  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href') && !DOMAIN_REGEX.test(event.target.getAttribute('href'))) {
      this.router.navigateByUrl(event.target.getAttribute('href'));
      event.preventDefault();
    }
  }
}
