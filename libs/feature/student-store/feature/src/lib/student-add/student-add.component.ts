import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '@seed/feature/student/data-access';
import { api } from '@seed/shared/util';
import { shareReplay, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'seed-student-add',
  templateUrl: './student-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentAddComponent {
  constructor(public studentService: StudentService, private router: Router, private route: ActivatedRoute) {}

  studentForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[1-9]\d*$/)],
    }),
  });

  private saveSubject = new Subject<void>();

  add$ = this.saveSubject.pipe(
    switchMap(() => this.studentService.addStudent(this.studentForm.value).pipe(api(() => this.goBack()))),
    shareReplay(1),
  );

  goBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  save() {
    this.saveSubject.next();
  }
}
