import { ApiQuery } from '@seed/shared/model';
import { catchError, map, Observable, of, pipe, startWith, UnaryFunction } from 'rxjs';

export function api<T>(): UnaryFunction<Observable<T>, Observable<ApiQuery<T>>> {
  return pipe(
    map(data => ({ loading: false, error: null, data })),
    startWith({ loading: true, error: null, data: null }),
    catchError(error => of({ loading: false, error, data: null })),
  );
}
