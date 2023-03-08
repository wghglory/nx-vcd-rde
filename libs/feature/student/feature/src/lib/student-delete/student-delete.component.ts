import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentService } from '@seed/feature/student/data-access';
import { api } from '@seed/shared/util';
import { filter, share, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-student-delete',
  templateUrl: './student-delete.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDeleteComponent {
  constructor(public studentService: StudentService) {}

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  private saveSubject = new Subject<void>();

  delete$ = this.saveSubject.pipe(
    switchMap(() => this.studentService.selectedStudent$.pipe(filter(Boolean))),
    switchMap(student =>
      this.studentService.deleteStudent(student.id).pipe(
        api(() => {
          this.close();
          this.studentService.selectStudent(null);
          this.studentService.refreshList();
        }),
      ),
    ),
    share(), // cannot use shareReplay as it will replay the delete when selecting an item
  );

  close() {
    this.openChange.emit(false);
  }

  confirm() {
    this.saveSubject.next();
  }
}
