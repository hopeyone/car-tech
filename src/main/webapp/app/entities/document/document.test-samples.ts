import { IDocument, NewDocument } from './document.model';

export const sampleWithRequiredData: IDocument = {
  id: 70614,
  title: 'Planner Borders',
  size: 75376,
};

export const sampleWithPartialData: IDocument = {
  id: 61321,
  title: 'Home Berkshire Future',
  size: 8569,
};

export const sampleWithFullData: IDocument = {
  id: 75263,
  title: 'next California',
  size: 19139,
  mimeType: 'Cambridgeshire',
};

export const sampleWithNewData: NewDocument = {
  title: 'Branding Mountains drive',
  size: 87831,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
