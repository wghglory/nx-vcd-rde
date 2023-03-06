import { RDEEntityState } from '@seed/shared/model';

export interface Student extends RDEEntityState {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  lastModifiedDate: Date;
}
