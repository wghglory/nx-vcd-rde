import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@seed/shared/services';
import { filter, map, mergeMap, Observable, tap } from 'rxjs';

import { Layout } from './layout/layout';

@Component({
  selector: 'seed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) {}

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
