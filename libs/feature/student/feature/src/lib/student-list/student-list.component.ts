import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { ApiQuery, RDEList } from '@seed/shared/model';
import { api, dgState, stateHandler } from '@seed/shared/util';
import { isEqual } from 'lodash';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, share, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'seed-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListComponent {
  constructor(public studentService: StudentService) {}

  openDeleteDialog = false;

  selectedStudent: Student | undefined;

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(dgState());

  students$: Observable<ApiQuery<RDEList<Student>>> = combineLatest([this.dgState$, this.studentService.refresh$]).pipe(
    switchMap(([state]) => {
      const params = stateHandler(state);
      return this.studentService.getStudentList(params).pipe(api());
    }),
    startWith({ loading: true, error: null, data: null }), // used to trigger the first render of datagrid.
    share(),
  );

  total$ = this.students$.pipe(
    filter(s => Boolean(s.data)),
    distinctUntilChanged(isEqual),
    map(res => res.data?.resultTotal),
  );

  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
