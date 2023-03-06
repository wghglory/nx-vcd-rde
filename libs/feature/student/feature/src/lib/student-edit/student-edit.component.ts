import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '@seed/feature/student/data-access';
import { api } from '@seed/shared/util';
import { filter, shareReplay, Subject, switchMap, take } from 'rxjs';

@Component({
  selector: 'seed-student-edit',
  templateUrl: './student-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentEditComponent implements OnInit {
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

  edit$ = this.saveSubject.pipe(
    switchMap(() => this.studentService.selectedItem$.pipe(filter(Boolean))),
    switchMap(student => {
      return this.studentService.updateStudent(student.id, this.studentForm.value).pipe(
        api(() => {
          this.studentService.selectItem(null);
          this.goBack();
        }),
      );
    }),
    shareReplay(1),
  );

  goBack() {
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }

  save() {
    this.saveSubject.next();
  }

  ngOnInit() {
    // init form
    this.studentService.selectedItem$.pipe(filter(Boolean), take(1)).subscribe(student => {
      this.studentForm.setValue({
        firstName: student.firstName,
        lastName: student.lastName,
        age: student.age,
      });
    });
  }
}
