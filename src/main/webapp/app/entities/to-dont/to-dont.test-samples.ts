import { IToDont, NewToDont } from './to-dont.model';

export const sampleWithRequiredData: IToDont = {
  id: 72899,
};

export const sampleWithPartialData: IToDont = {
  id: 16972,
  title: 'Plastic Ergonomic',
  description: 'wireless alliance Dynamic',
};

export const sampleWithFullData: IToDont = {
  id: 95164,
  title: 'multi-byte',
  description: 'Supervisor',
};

export const sampleWithNewData: NewToDont = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
