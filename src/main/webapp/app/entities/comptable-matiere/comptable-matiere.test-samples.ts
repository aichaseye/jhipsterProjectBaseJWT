import { IComptableMatiere, NewComptableMatiere } from './comptable-matiere.model';

export const sampleWithRequiredData: IComptableMatiere = {
  id: 44181,
  nomPrenom: 'Jewelery withdrawal deposit',
};

export const sampleWithPartialData: IComptableMatiere = {
  id: 7164,
  nomPrenom: 'fault-tolerant',
};

export const sampleWithFullData: IComptableMatiere = {
  id: 60980,
  nomPrenom: 'program Mouse',
};

export const sampleWithNewData: NewComptableMatiere = {
  nomPrenom: 'Synchronised SAS SQL',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
