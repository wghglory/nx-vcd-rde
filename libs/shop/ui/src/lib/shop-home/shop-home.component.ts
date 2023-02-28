import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { SharedModule } from '@seed/shared/modules';
import { AuthService } from '@seed/shared/services';
import { alertActions } from '@seed/shared/ui';

@Component({
  selector: 'seed-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
  standalone: true,
  imports: [SharedModule, RouterModule],
})
export class ShopHomeComponent {
  constructor(private authService: AuthService, private store: Store) {
    this.store.dispatch(
      alertActions.addAlert({
        alert: {
          message: 'A demo alert sent from remote app to host.',
          alertKey: 'global',
        },
      }),
    );
  }

  user$ = this.authService.currentUser$;
}
