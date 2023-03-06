import { faker } from '@faker-js/faker';
import { Student } from '@seed/feature/student/model';
import { RDEList, RDEValue } from '@seed/shared/model';

export function createStudent({ firstName, lastName, age, state }: Partial<Student>): RDEValue<Student> {
  const id = `urn:vcloud:entity:vmware:student:${faker.datatype.uuid()}`;

  return {
    id,
    entityType: 'urn:vcloud:type:vmware:student:1.0.0',
    name: `${firstName} ${lastName}`,
    externalId: null,
    entity: {
      id,
      firstName,
      lastName,
      age,
      lastModifiedDate: faker.date.past(),
      state,
      state_reason: state === 'success' ? '' : 'failed for some reasons',
    } as Student,
    state: state === 'success' ? 'RESOLVED' : faker.helpers.arrayElement(['RESOLUTION_ERROR', 'PRE_CREATED']),
    owner: {
      name: 'admin',
      id: `urn:vcloud:user:${faker.datatype.uuid()}`,
    },
    org: faker.helpers.arrayElement([{ name: 'System', id: faker.datatype.uuid() }]),
  };
}

const studentsNum = faker.datatype.number({ min: 40, max: 100 });

export const students: RDEList<Student> = {
  resultTotal: studentsNum,
  pageCount: studentsNum,
  page: 1,
  pageSize: 25,
  associations: null,
  values: new Array(studentsNum).fill(1).map(
    _ => <RDEValue<Student>>createStudent({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 30 }),
        state: faker.helpers.arrayElement(['success', 'error']),
      }),
  ),
};
