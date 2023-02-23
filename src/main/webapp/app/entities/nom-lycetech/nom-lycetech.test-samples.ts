import { INomLycetech, NewNomLycetech } from './nom-lycetech.model';

export const sampleWithRequiredData: INomLycetech = {
  id: 17024,
};

export const sampleWithPartialData: INomLycetech = {
  id: 48443,
};

export const sampleWithFullData: INomLycetech = {
  id: 6965,
  nomLycee: 'Savings JSON Pompe',
};

export const sampleWithNewData: NewNomLycetech = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
