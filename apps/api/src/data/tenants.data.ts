import { faker } from '@faker-js/faker';
import { Tenant } from '@seed/shared/model';

export const tenants: Tenant[] = [
  {
    id: 'acme',
    name: 'ACME',
    enabled: true,
    fullName: 'ACME full name',
    lastModifiedDate: new Date('2022-01-01'),
  },
];
const data = new Array(45).fill(1).map(i => {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    fullName: faker.name.firstName(),
    enabled: Math.random() < 0.5,
    lastModifiedDate: faker.date.past(),
  } as Tenant;
});
tenants.push(...data);
