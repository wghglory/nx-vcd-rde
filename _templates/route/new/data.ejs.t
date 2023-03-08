---
to: apps/api/src/data/<%=entityType%>.data.ts
---

import { faker } from '@faker-js/faker';
import { <%=h.capitalize(entityType)%> } from '@seed/feature/<%=entityType%>/model';
import { RDEList, RDEValue } from '@seed/shared/model';

export function create<%=h.capitalize(entityType)%>({ name, state }: Partial<<%=h.capitalize(entityType)%>>): RDEValue<<%=h.capitalize(entityType)%>> {
  const id = `urn:vcloud:entity:vmware:<%=entityType%>:${faker.datatype.uuid()}`;

  return {
    id,
    entityType: 'urn:vcloud:type:vmware:<%=entityType%>:1.0.0',
    name: `${name}`,
    externalId: null,
    entity: {
      id,
      name,
      lastModifiedDate: faker.date.past(),
      state,
      state_reason: state === 'success' ? '' : 'failed for some reasons',
    } as <%=h.capitalize(entityType)%>,
    state: state === 'success' ? 'RESOLVED' : faker.helpers.arrayElement(['RESOLUTION_ERROR', 'PRE_CREATED']),
    owner: {
      name: 'admin',
      id: `urn:vcloud:user:${faker.datatype.uuid()}`,
    },
    org: faker.helpers.arrayElement([{ name: 'System', id: faker.datatype.uuid() }]),
  };
}

const <%=entityType%>sNum = faker.datatype.number({ min: 40, max: 100 });

export const <%=entityType%>s: RDEList<<%=h.capitalize(entityType)%>> = {
  resultTotal: <%=entityType%>sNum,
  pageCount: <%=entityType%>sNum,
  page: 1,
  pageSize: 25,
  associations: null,
  values: new Array(<%=entityType%>sNum).fill(1).map(
    _ => <RDEValue<<%=h.capitalize(entityType)%>>>create<%=h.capitalize(entityType)%>({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        state: faker.helpers.arrayElement(['success', 'error']),
      }),
  ),
};
