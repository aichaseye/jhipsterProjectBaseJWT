import { TypeEtab } from 'app/entities/enumerations/type-etab.model';
import { StatutEtab } from 'app/entities/enumerations/statut-etab.model';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { NomDep } from 'app/entities/enumerations/nom-dep.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { TypeInspection } from 'app/entities/enumerations/type-inspection.model';

import { IEtablissement, NewEtablissement } from './etablissement.model';

export const sampleWithRequiredData: IEtablissement = {
  id: 16156,
  typeEtab: TypeEtab['LyceeTechnique'],
};

export const sampleWithPartialData: IEtablissement = {
  id: 22693,
  matriculeEtab: 'Computer',
  typeEtab: TypeEtab['CFP'],
  anneeCre: 47002,
  autreRegion: 'olive dot-com (EURCO)',
  emailEtab: 'Analyste Fantastic',
};

export const sampleWithFullData: IEtablissement = {
  id: 24777,
  matriculeEtab: 'input Yen',
  typeEtab: TypeEtab['CFP'],
  autrenomEtab: 'Home la',
  anneeCre: 68623,
  statut: StatutEtab['Public'],
  region: NomReg['DAKAR'],
  autreRegion: 'Licensed Producteur Granite',
  departement: NomDep['Guediawaye'],
  autreDep: 'Tuna',
  commune: 'Games',
  codeRegion: CodeRegion['C13'],
  autrecodeRegion: 'Car Loan exuding',
  emailEtab: 'c',
  typeInsp: TypeInspection['IA'],
};

export const sampleWithNewData: NewEtablissement = {
  typeEtab: TypeEtab['LyceeTechnique'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
