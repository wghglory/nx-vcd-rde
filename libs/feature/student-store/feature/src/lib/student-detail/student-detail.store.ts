import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { StudentService } from '@seed/feature/student/data-access';
import { Student } from '@seed/feature/student/model';
import { RDEValue } from '@seed/shared/model';
import { startWithTap } from '@seed/shared/util';
import { switchMap } from 'rxjs';

export interface StudentState {
  loading: boolean;
  error: HttpErrorResponse | null;
  student: RDEValue<Student> | null;
}

@Injectable()
export class StudentDetailStore extends ComponentStore<StudentState> {
  constructor(private readonly studentService: StudentService, private route: ActivatedRoute, private router: Router) {
    super({ loading: false, error: null, student: null });
  }

  // Selectors
  readonly vm$ = this.select(state => ({
    loading: state.loading,
    error: state.error,
    student: state.student,
  }));

  // Updaters
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setSuccess = this.updater((state, student: RDEValue<Student>) => ({
    ...state,
    loading: false,
    student,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    loading: false,
    error,
  }));

  // Effects
  readonly getStudent = this.effect(() =>
    this.route.params.pipe(
      switchMap(({ id }) => {
        const navigation = this.router.getCurrentNavigation();
        const stateData = navigation?.extras.state as RDEValue<Student>;

        if (stateData) {
          this.patchState({ student: stateData });
        }

        return this.studentService.getStudent(id).pipe(
          startWithTap(() => {
            if (!stateData) {
              this.setLoading(true);
            }
          }),
          tapResponse(
            res => this.setSuccess(res),
            (error: HttpErrorResponse) => this.setError(error),
          ),
        );
      }),
    ),
  );
}
