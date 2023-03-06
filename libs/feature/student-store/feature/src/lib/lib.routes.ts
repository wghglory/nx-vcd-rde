import { Route } from '@angular/router';

import { StudentAddComponent } from './student-add/student-add.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';

export const routes: Route[] = [
  { path: '', component: StudentListComponent },
  {
    path: ':id',
    component: StudentDetailComponent,
  },
  {
    path: '@/add',
    component: StudentAddComponent,
  },
  {
    path: '@/edit/:id',
    component: StudentEditComponent,
  },
];
