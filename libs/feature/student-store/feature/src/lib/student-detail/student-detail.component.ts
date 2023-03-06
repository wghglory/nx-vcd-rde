import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '@seed/feature/student/data-access';
import { api } from '@seed/shared/util';
import { switchMap } from 'rxjs';

@Component({
  selector: 'seed-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetailComponent {
  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  student$ = this.route.params.pipe(
    switchMap(({ id }) => this.studentService.getStudent(id)),
    api(),
  );
}
