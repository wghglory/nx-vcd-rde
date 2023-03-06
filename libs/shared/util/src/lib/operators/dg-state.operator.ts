import { ClrDatagridStateInterface } from '@clr/angular';
import { isEqual } from 'lodash';
import { debounce, distinctUntilChanged, map, Observable, pairwise, pipe, timer, UnaryFunction } from 'rxjs';

export function dgState(): UnaryFunction<Observable<ClrDatagridStateInterface | null>, Observable<ClrDatagridStateInterface>> {
  return pipe(
    // prepare old and new states filters in order to delay
    // since behaviorSubject and clrDatagrid emits null and null, no need to `startWith(null)`
    pairwise(),
    // only when filter changes, timer(500) to defer to simulate typeahead.
    debounce(([prev, curr]) => (isEqual(prev?.filters, curr?.filters) ? timer(0) : timer(500))),
    map(([prev, curr]) => curr),
    // if prev and curr state are the same, no need to emit. e.g. filter was 'a', user type 'aa' and quickly rollback to 'a'
    distinctUntilChanged(isEqual),
  );
}
