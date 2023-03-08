import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Student } from '@seed/feature/student/model';
import { CLR_DG_DEFAULT_STATE } from '@seed/shared/util';

import { StudentListStore } from './student-list.store';

@Component({
  selector: 'seed-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StudentListStore],
})
export class StudentListComponent {
  constructor(public store: StudentListStore) {}

  openDeleteDialog = false;

  selectedItem: Student | undefined;

  prevState: ClrDatagridStateInterface = CLR_DG_DEFAULT_STATE;

  selectItem(item: Student) {
    // this.selectedItem = item;
    // this.store.patchState({ selectedStudent: item });
    this.store.setSelected(item);
  }

  refresh(state: ClrDatagridStateInterface) {
    this.prevState = state;
    this.store.getStudentList(state);
  }

  refreshWithPrevState() {
    this.store.getStudentList(this.prevState);
  }
}
