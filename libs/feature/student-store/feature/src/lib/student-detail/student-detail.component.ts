import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StudentDetailStore } from './student-detail.store';

@Component({
  selector: 'seed-student-detail',
  templateUrl: './student-detail.component.html',
  providers: [StudentDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetailComponent {
  constructor(public store: StudentDetailStore) {}
}
