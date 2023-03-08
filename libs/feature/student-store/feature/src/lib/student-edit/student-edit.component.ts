import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '@seed/feature/student/model';

import { StudentEditStore } from './student-edit.store';

@Component({
  selector: 'seed-student-edit',
  templateUrl: './student-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StudentEditStore],
})
export class StudentEditComponent {
  constructor(public store: StudentEditStore, private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const student = navigation?.extras.state as Student;

    if (student) {
      this.studentForm.setValue({
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
      });
    }
  }

  studentForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[1-9]\d*$/)],
    }),
  });

  goBack() {
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }

  save() {
    this.store.updateStudent(this.studentForm.value);
  }
}
