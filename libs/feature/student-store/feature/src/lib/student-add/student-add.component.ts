import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentAddStore } from './student-add.store';

@Component({
  selector: 'seed-student-add',
  templateUrl: './student-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StudentAddStore],
})
export class StudentAddComponent {
  constructor(public store: StudentAddStore, private router: Router, private route: ActivatedRoute) {}

  studentForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[1-9]\d*$/)],
    }),
  });

  cancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  save() {
    this.store.addStudent(this.studentForm.value);
  }
}
