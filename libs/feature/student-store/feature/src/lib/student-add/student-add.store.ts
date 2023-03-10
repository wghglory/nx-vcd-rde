import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Student } from '@seed/feature/student/model';
import { StudentService } from '@seed/feature/student-store/data-access';
import { Observable, switchMap, tap } from 'rxjs';

export interface StudentState {
  loading: boolean;
  error: HttpErrorResponse | null;
}

@Injectable()
export class StudentAddStore extends ComponentStore<StudentState> {
  constructor(private readonly studentService: StudentService, private router: Router, private route: ActivatedRoute) {
    super({ loading: false, error: null });
  }

  // Selectors
  readonly vm$ = this.select(state => ({
    loading: state.loading,
    error: state.error,
  }));

  // Updaters
  readonly callingAPI = this.updater(state => ({
    ...state,
    loading: true,
    error: null,
  }));

  readonly setSuccess = this.updater(state => ({
    ...state,
    loading: false,
  }));

  readonly setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    loading: false,
    error,
  }));

  // Effects
  readonly addStudent = this.effect((student$: Observable<Partial<Student>>) =>
    student$.pipe(
      tap(() => this.callingAPI()),
      switchMap(student =>
        this.studentService.addStudent(student).pipe(
          tapResponse(
            () => {
              this.setSuccess();
              this.router.navigate(['../../'], { relativeTo: this.route });
            },
            (error: HttpErrorResponse) => this.setError(error),
          ),
        ),
      ),
    ),
  );
}
