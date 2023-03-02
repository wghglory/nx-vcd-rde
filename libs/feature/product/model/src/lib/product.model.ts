import { RDEEntityState } from '@seed/shared/model';

export interface Product extends RDEEntityState {
  id: string;
  name: string;
  productionDate: string;
  description: string;
}
