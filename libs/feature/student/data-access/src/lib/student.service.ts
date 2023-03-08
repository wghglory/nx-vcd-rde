import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '@seed/feature/student/model';
import { PageQuery, RDEList, RDEValue } from '@seed/shared/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  private refreshAction = new BehaviorSubject<void>(undefined);
  refreshAction$ = this.refreshAction.asObservable();

  private selectedItemSource = new BehaviorSubject<Student | null>(null);
  selectedItem$ = this.selectedItemSource.asObservable();

  refreshList() {
    this.refreshAction.next();
  }

  selectItem(student: Student | null) {
    this.selectedItemSource.next(student);
  }

  getStudentList(params: Partial<PageQuery>) {
    return this.http.get<RDEList<Student>>('/api/students', { params });
  }

  getStudent(id: string) {
    return this.http.get<RDEValue<Student>>(`/api/students/${id}`);
  }

  addStudent(payload: Partial<Student>) {
    return this.http.post<RDEValue<Student>>(`/api/students`, payload);
  }

  updateStudent(id: string, payload: Partial<Student>) {
    return this.http.patch<RDEValue<Student>>(`/api/students/${id}`, payload);
  }

  deleteStudent(id: string) {
    return this.http.delete<void>(`/api/students/${id}`);
  }
}
