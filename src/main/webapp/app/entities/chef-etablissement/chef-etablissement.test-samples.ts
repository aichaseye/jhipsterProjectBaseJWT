import { IChefEtablissement, NewChefEtablissement } from './chef-etablissement.model';

export const sampleWithRequiredData: IChefEtablissement = {
  id: 36109,
  nomPrenom: 'deposit generate',
};

export const sampleWithPartialData: IChefEtablissement = {
  id: 77011,
  nomPrenom: 'THX Rand card',
};

export const sampleWithFullData: IChefEtablissement = {
  id: 12904,
  nomPrenom: 'Designer Analyste',
};

export const sampleWithNewData: NewChefEtablissement = {
  nomPrenom: 'b Haute-Normandie',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
