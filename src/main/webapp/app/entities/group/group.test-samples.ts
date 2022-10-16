import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 82913,
};

export const sampleWithPartialData: IGroup = {
  id: 28143,
};

export const sampleWithFullData: IGroup = {
  id: 53984,
  name: 'Orchestrator Virginia',
};

export const sampleWithNewData: NewGroup = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
