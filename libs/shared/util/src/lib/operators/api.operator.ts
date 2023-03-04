import { HttpErrorResponse } from '@angular/common/http';
import { ApiQuery } from '@seed/shared/model';
import { catchError, map, Observable, of, pipe, startWith, tap, UnaryFunction } from 'rxjs';

/**
 * Custom operator for api call with loading, error, data.
 *
 * usage 1: Simple 1 request
 * data$ = this.shopService.products$.pipe(
    api(
      res => console.log('side effect if success: ' + res),
      error => {
        console.error('side effect if error: ' + error.message);
      },
    ),

    usage 2: dependent request
    data$ = firstCall$.pipe(
      switchMap(() => this.shopService.products$),
      api(),
    ),
  );
 * @param callback successful callback (side effect), e.g. close dialog
 * @param errorCallback error callback, e.g. send toast alert
 */
export function api<T>(
  callback?: (source?: T) => void,
  errorCallback?: (error: HttpErrorResponse) => void,
): UnaryFunction<Observable<T>, Observable<ApiQuery<T>>> {
  return pipe(
    map(data => ({ loading: false, error: null, data })),
    tap({
      next: res => callback?.(res.data),
      error: err => errorCallback?.(err),
    }),
    startWith({ loading: true, error: null, data: null }),
    // retry(1), // if want to add retry
    catchError(error => of({ loading: false, error, data: null })),
  );
}
