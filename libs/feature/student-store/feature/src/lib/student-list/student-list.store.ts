import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { RDEList } from '@seed/shared/model';
import { CLR_DG_DEFAULT_STATE, dgStore, stateHandler } from '@seed/shared/util';
import { Observable, switchMap, tap } from 'rxjs';

export interface StudentsState {
  students: RDEList<Student> | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  selectedStudent: Student | null;
  dgState: ClrDatagridStateInterface; // if we'd like to refresh with previous state after deleting a record, we need this to keep track of the state. Otherwise, call refresh with default state.
}

@Injectable()
export class StudentListStore extends ComponentStore<StudentsState> {
  constructor(private studentService: StudentService) {
    super({ students: null, loading: false, error: null, selectedStudent: null, dgState: CLR_DG_DEFAULT_STATE });
  }

  // Selectors
  readonly vm$ = this.select(state => ({
    students: state.students,
    loading: state.loading,
    error: state.error,
    selectedStudent: state.selectedStudent,
  }));
  readonly selectedStudent$ = this.select(state => state.selectedStudent);
  readonly dgState$ = this.select(state => state.dgState);

  // Updaters
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setList = this.updater((state, students: RDEList<Student>) => ({
    ...state,
    students,
    loading: false,
    error: null,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    students: null,
    loading: false,
    error,
  }));

  // This is usefully especially when more dialogs need it like delete, edit item dialog
  readonly setSelected = this.updater((state, selectedStudent: Student) => ({
    ...state,
    selectedStudent,
  }));

  // useful after deleting/editing and refresh the datagrid
  readonly setDgState = this.updater((state, dgState: ClrDatagridStateInterface) => ({
    ...state,
    dgState,
  }));

  // Effects
  readonly getStudentList = this.effect((state$: Observable<ClrDatagridStateInterface>) => {
    return state$.pipe(
      dgStore(),
      tap(() => this.setLoading(true)),
      switchMap(state => {
        this.setDgState(state);

        const params = stateHandler(state);
        return this.studentService.getStudentList(params).pipe(
          tapResponse(
            res => this.setList(res),
            (error: HttpErrorResponse) => this.setError(error),
          ),
        );
      }),
    );
  });
}
