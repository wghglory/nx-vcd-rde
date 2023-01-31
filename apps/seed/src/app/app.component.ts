import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { alertActions } from '@seed/shared/ui';
import { filter, map, mergeMap, Observable } from 'rxjs';

import { Layout } from './layout/layout';

@Component({
  selector: 'seed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
    store.dispatch(
      alertActions.addAlert({
        alert: {
          id: Symbol(1),
          message: 'alert.support',
          alertKey: 'global',
        },
      }),
    );

    store.dispatch(
      alertActions.addAlert({
        alert: { type: 'success', message: 'alert.todayDesc', alertKey: 'global', params: ['Tuesday'] },
      }),
    );
  }

  layout$: Observable<Layout> = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.activatedRoute),
    map(route => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }),
    filter(route => route.outlet === 'primary'),
    mergeMap(route => route.data),
    map(({ layout }) => layout),
  );
}
