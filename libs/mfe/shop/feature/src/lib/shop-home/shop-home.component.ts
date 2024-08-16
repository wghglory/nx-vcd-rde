import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@seed/shared/data-access';
import { SharedModule } from '@seed/shared/module';
import { PageContainerComponent } from '@seed/shared/ui';
import { AlertService } from 'clr-lift';

@Component({
  selector: 'seed-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
  standalone: true,
  imports: [SharedModule, RouterModule, PageContainerComponent],
})
export class ShopHomeComponent {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    this.alertService.addAlert({
      content: 'A demo alert sent from remote app to host.',
    });
  }

  user$ = this.authService.currentUser$;
}
