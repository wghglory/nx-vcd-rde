import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageContainerComponent, SharedUiModule } from '@seed/shared/ui';
import { AlertComponent } from 'clr-lift';

import { routes } from './lib.routes';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  imports: [SharedUiModule, RouterModule.forChild(routes), PageContainerComponent, ReactiveFormsModule, AlertComponent],
  declarations: [StudentListComponent, StudentAddComponent, StudentDeleteComponent, StudentEditComponent, StudentDetailComponent],
})
export class FeatureStudentFeatureModule {}
