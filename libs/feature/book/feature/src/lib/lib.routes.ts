import { Route } from '@angular/router';

import { BookAddComponent } from './book-add/book-add.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Route[] = [
  { path: '', component: BookListComponent },
  {
    path: ':id',
    component: BookDetailComponent,
  },
  {
    path: '@/add',
    component: BookAddComponent,
  },
  {
    path: '@/edit/:id',
    component: BookEditComponent,
  },
];
