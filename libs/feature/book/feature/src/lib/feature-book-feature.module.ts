import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageContainerComponent, SharedUiModule } from '@seed/shared/ui';

import { routes } from './lib.routes';
import { BookAddComponent } from './book-add/book-add.component';
import { BookDeleteComponent } from './book-delete/book-delete.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';

@NgModule({
  imports: [SharedUiModule, RouterModule.forChild(routes), PageContainerComponent, ReactiveFormsModule],
  declarations: [BookListComponent, BookAddComponent, BookDeleteComponent, BookEditComponent, BookDetailComponent],
})
export class FeatureBookFeatureModule {}
