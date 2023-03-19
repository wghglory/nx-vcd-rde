import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentService } from '@seed/feature/student/data-access';
import { api } from '@seed/shared/util';
import { filter, share, shareReplay, Subject, switchMap } from 'rxjs';

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
    switchMap(() => {
      return this.studentService.selectedStudent$.pipe(filter(Boolean));
    }),
    switchMap(student => {
      console.log(student);

      return this.studentService.deleteStudent(student.id).pipe(
        api(() => {
          this.close();
          this.studentService.refreshList();
        }),
      );
    }),
    // shareReplay({ refCount: true, bufferSize: 1 }),
    share(), // or shareReplay({ refCount: true }), which makes sure unsubscribe when count is 0
    // if refCount is false (default), selectedStudent$ is still alive, every time selecting a student, will trigger the delete.
  );

  close() {
    this.studentService.selectStudent(null);
    this.openChange.emit(false);
  }

  confirm() {
    this.saveSubject.next();
  }
}
