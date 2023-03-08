import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { StudentService } from '@seed/feature/student/data-access';

import { StudentListStore } from './../student-list/student-list.store';
import { StudentDeleteStore } from './student-delete.store';

@Component({
  selector: 'seed-student-delete',
  templateUrl: './student-delete.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StudentDeleteStore],
})
export class StudentDeleteComponent {
  constructor(public studentService: StudentService, public store: StudentDeleteStore, public listStore: StudentListStore) {}

  @Input()
  set open(openDialog: boolean) {
    this.store.patchState({ openDialog });
  }

  @Output() openChange = this.store.openDialog$;

  close() {
    this.store.patchState({ openDialog: false });
  }

  confirm() {
    this.store.deleteStudent(this.listStore.selectedStudent$);
  }
}
