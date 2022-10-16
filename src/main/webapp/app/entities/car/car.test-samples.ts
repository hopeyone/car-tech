import { ICar, NewCar } from './car.model';

export const sampleWithRequiredData: ICar = {
  id: 96848,
  model: 'local National Account',
};

export const sampleWithPartialData: ICar = {
  id: 5116,
  model: 'Investor groupware',
};

export const sampleWithFullData: ICar = {
  id: 47603,
  model: 'fuchsia Cape',
};

export const sampleWithNewData: NewCar = {
  model: 'generating Avon expedite',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
