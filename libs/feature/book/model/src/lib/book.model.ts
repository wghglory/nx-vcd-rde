import { RDEEntityState } from '@seed/shared/model';

export interface Book extends RDEEntityState {
  // TODO
  id: string;
  name: string;
  lastModifiedDate: Date;
}
