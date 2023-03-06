import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { RDEList } from '@seed/shared/model';
import { api, logger, stateHandler } from '@seed/shared/util';
import { isEqual } from 'lodash';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounce,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  of,
  pairwise,
  share,
  shareReplay,
  startWith,
  switchMap,
  timer,
} from 'rxjs';

@Component({
  selector: 'seed-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListComponent {
  constructor(public studentService: StudentService) {}

  openDeleteDialog = false;

  selectedItem: Student | undefined;

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(
    // prepare old and new states filters in order to delay
    // since behaviorSubject and clrDatagrid emits null and null, no need to `startWith(null)`
    pairwise(),
    // only when filter changes, timer(500) to defer to simulate typeahead.
    debounce(([prev, curr]) => {
      return isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500);
    }),
    map(([prev, curr]) => curr),
    // if prev and curr state are the same, no need to emit. e.g. filter was 'a', user type 'aa' and quickly rollback to 'a'
    distinctUntilChanged(isEqual),
  ) as Observable<ClrDatagridStateInterface>;

  students$: Observable<{ loading: boolean; data: RDEList<Student> | null; error: HttpErrorResponse | null }> = combineLatest([
    this.dgState$,
    this.studentService.refreshAction$, // actions like successful deletion to refresh the data
  ]).pipe(
    switchMap(([state]) => {
      const params = stateHandler(state);
      return merge(
        // of({ loading: true, error: null, data: null }),
        this.studentService.getStudents(params).pipe(api()),
      );
    }),
    startWith({ loading: true, error: null, data: null }), // used to trigger the first render of datagrid.
    shareReplay(1),
  );

  total$ = this.students$.pipe(
    filter(s => Boolean(s.data)),
    map(res => res.data?.resultTotal),
  );

  // will be called right after initially datagrid loads data
  // 1st: BehaviorSubject emit null
  // 2nd: emit default state: { "page": { "from": -1, "to": -1, "size": 10, "current": 1 }}
  // every filter stroke will also trigger it
  refresh(state: ClrDatagridStateInterface) {
    console.log('refresh', state);
    this.dgSource.next(state);
  }
}
