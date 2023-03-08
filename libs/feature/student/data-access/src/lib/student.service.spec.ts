import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Student } from '@seed/feature/student/model';
import { RDEList, RDEValue } from '@seed/shared/model';

import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StudentService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get students', () => {
    service.getStudentList({ page: 1 }).subscribe();

    const request = controller.expectOne(req => req.method === 'GET' && req.url.includes('api/students'));

    // Assert that the request is a GET.
    expect(request.request.method).toEqual('GET');

    const data = {
      resultTotal: 1,
      pageCount: 1,
      page: 1,
      pageSize: 10,
      associations: [],
      values: [
        {
          entity: {
            id: 'mockId',
            firstName: 'Derek',
            age: 30,
            lastModifiedDate: new Date(),
          },
        },
      ],
    } as RDEList<Student>;
    request.flush(data);
  });

  it('get single student', () => {
    service.getStudent('mockId').subscribe();

    const request = controller.expectOne(req => req.method === 'GET' && req.url.includes('api/students/mockId'));

    // Assert that the request is a GET.
    expect(request.request.method).toEqual('GET');
    request.flush({
      entity: {
        id: 'mockId',
        firstName: 'Derek',
        lastName: 'Wang',
        lastModifiedDate: new Date(),
        age: 30,
      },
    } as RDEValue<Student>);
  });

  it('add a student', () => {
    service.addStudent({ firstName: 'Derek', lastName: 'Wang', age: 30 }).subscribe();

    const request = controller.expectOne(req => req.method === 'POST' && req.url.includes('api/students'));

    // Assert that the request is a POST.
    expect(request.request.method).toEqual('POST');
    request.flush({
      entity: {
        id: 'mockId',
        firstName: 'Derek',
        lastName: 'Wang',
        age: 30,
        lastModifiedDate: new Date(),
      },
    } as RDEValue<Student>);
  });

  it('delete a student', () => {
    service.deleteStudent('mockId').subscribe();

    const request = controller.expectOne(req => req.method === 'DELETE' && req.url.includes('api/students/mockId'));

    // Assert that the request is a DELETE.
    expect(request.request.method).toEqual('DELETE');
    request.flush(null);
  });

  it('update a student', () => {
    service.updateStudent('mockId', { firstName: 'Guanghui' }).subscribe();

    const request = controller.expectOne(req => req.method === 'PATCH' && req.url.includes('api/students/mockId'));

    // Assert that the request is a PATCH.
    expect(request.request.method).toEqual('PATCH');
    request.flush({
      entity: {
        id: 'mockId',
        firstName: 'Guanghui',
        lastName: 'Wang',
        lastModifiedDate: new Date(),
        age: 30,
      },
    } as RDEValue<Student>);
  });

  it('refresh list', () => {
    service.refreshList();

    expect(subscribeSpyTo(service.refreshAction$).getFirstValue()).toBeUndefined();
  });

  it('select item', () => {
    const student = {
      id: 'mockId',
      firstName: 'Derek',
      lastName: 'Wang',
      age: 30,
      lastModifiedDate: new Date(),
    } as Student;

    service.selectItem(student);

    expect(subscribeSpyTo(service.selectedItem$).getFirstValue()).toEqual(student);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    controller.verify();
  });
});
