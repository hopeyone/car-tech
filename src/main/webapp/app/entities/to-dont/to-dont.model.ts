import { IGroup } from 'app/entities/group/group.model';

export interface IToDont {
  id: number;
  title?: string | null;
  description?: string | null;
  group?: Pick<IGroup, 'id'> | null;
}

export type NewToDont = Omit<IToDont, 'id'> & { id: null };
