import { Route } from '@angular/router';

import { GreetComponent } from './greet/greet.component';
import { HomeComponent } from './home/home.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'greet', component: GreetComponent },
];
