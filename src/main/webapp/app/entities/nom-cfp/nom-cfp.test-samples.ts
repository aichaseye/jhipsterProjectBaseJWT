import { INomCFP, NewNomCFP } from './nom-cfp.model';

export const sampleWithRequiredData: INomCFP = {
  id: 92617,
};

export const sampleWithPartialData: INomCFP = {
  id: 73258,
  nomCFP: 'Fantastic AI',
};

export const sampleWithFullData: INomCFP = {
  id: 78289,
  nomCFP: 'Avon',
};

export const sampleWithNewData: NewNomCFP = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
