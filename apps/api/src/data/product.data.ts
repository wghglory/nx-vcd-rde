import { faker } from '@faker-js/faker';
import { Product } from '@seed/feature/product/model';
import { RDEList, RDEValue } from '@seed/shared/model';

export function createProduct({ name, description, state }: Partial<Product>): RDEValue<Product> {
  const id = `urn:vcloud:entity:vmware:product:${faker.datatype.uuid()}`;

  return {
    id,
    entityType: 'urn:vcloud:type:vmware:product:1.0.0',
    name: name,
    externalId: null,
    entity: {
      id,
      name,
      description,
      productionDate: faker.date.past().toDateString(),
      state,
      state_reason: state === 'success' ? '' : 'failed for some reasons',
    },
    state: state ? 'RESOLVED' : faker.helpers.arrayElement(['RESOLUTION_ERROR', 'PRE_CREATED']),
    owner: {
      name: 'admin',
      id: `urn:vcloud:user:${faker.datatype.uuid()}`,
    },
    org: faker.helpers.arrayElement([{ name: 'System', id: faker.datatype.uuid() }]),
  };
}

const productsNum = faker.datatype.number({ min: 40, max: 100 });

export const products: RDEList<Product> = {
  resultTotal: productsNum,
  pageCount: productsNum,
  page: 1,
  pageSize: 25,
  associations: null,
  values: new Array(productsNum).fill(1).map(
    _ => <RDEValue<Product>>createProduct({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(20),
        state: faker.helpers.arrayElement(['success', 'error']),
      }),
  ),
};
