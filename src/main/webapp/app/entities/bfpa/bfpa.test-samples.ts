import { IBFPA, NewBFPA } from './bfpa.model';

export const sampleWithRequiredData: IBFPA = {
  id: 79275,
  nomPrenom: 'structure mobile Auto',
};

export const sampleWithPartialData: IBFPA = {
  id: 71003,
  nomPrenom: 'connecting Analyste SSL',
};

export const sampleWithFullData: IBFPA = {
  id: 84186,
  nomPrenom: 'pixel',
};

export const sampleWithNewData: NewBFPA = {
  nomPrenom: 'PCI',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
