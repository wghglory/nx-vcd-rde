import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Student } from '@seed/feature/student/model';
import { StudentService } from '@seed/feature/student-store/data-access';
import { filter, Observable, switchMap, tap } from 'rxjs';

import { StudentListStore } from '../student-list/student-list.store';

export interface StudentState {
  loading: boolean;
  error: HttpErrorResponse | null;
  openDialog: boolean;
}

@Injectable()
export class StudentDeleteStore extends ComponentStore<StudentState> {
  constructor(private readonly studentService: StudentService, private readonly listStore: StudentListStore) {
    super({ loading: false, error: null, openDialog: true });
  }

  // Selectors
  readonly vm$ = this.select(state => ({
    loading: state.loading,
    error: state.error,
  }));

  openDialog$ = this.select(state => state.openDialog);

  // Updaters
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setSuccess = this.updater(state => ({
    ...state,
    loading: false,
    openDialog: false,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    loading: false,
    error,
  }));

  // Effects
  readonly deleteStudent = this.effect((selectedStudent$: Observable<Student | null>) =>
    selectedStudent$.pipe(
      filter(Boolean),
      tap(() => this.setLoading(true)),
      switchMap(student =>
        this.studentService.deleteStudent(student.id).pipe(
          tapResponse(
            () => {
              // close dialog, clear selectedItem, refresh DG
              this.setSuccess();
              this.listStore.patchState({ selectedStudent: null });
              this.listStore.getStudentList(this.listStore.dgState$);
            },
            (error: HttpErrorResponse) => this.setError(error),
          ),
        ),
      ),
    ),
  );
}
