import { IContent, NewContent } from './content.model';

export const sampleWithRequiredData: IContent = {
  id: 54584,
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
};

export const sampleWithPartialData: IContent = {
  id: 26546,
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
};

export const sampleWithFullData: IContent = {
  id: 41245,
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
};

export const sampleWithNewData: NewContent = {
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
