import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { TypeStructure } from 'app/entities/enumerations/type-structure.model';

import { IMatiere, NewMatiere } from './matiere.model';

export const sampleWithRequiredData: IMatiere = {
  id: 60871,
  region: NomReg['THIES'],
  codeRegion: CodeRegion['C02'],
};

export const sampleWithPartialData: IMatiere = {
  id: 56461,
  reference: 'SCSI',
  region: NomReg['KEDOUGOU'],
  codeRegion: CodeRegion['C09'],
  autrecodeRegion: 'Dirham',
  typeStructure: TypeStructure['II'],
  autreStructure: 'Soft withdrawal Ferronnerie',
};

export const sampleWithFullData: IMatiere = {
  id: 27300,
  nomMatiere: 'Buckinghamshire help-desk',
  reference: 'Loan Kyat Borders',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  matriculeMatiere: 'Bretagne withdrawal',
  region: NomReg['THIES'],
  autreRegion: 'invoice',
  codeRegion: CodeRegion['C14'],
  autrecodeRegion: 'invoice Rustic Practical',
  typeStructure: TypeStructure['DI'],
  autreStructure: 'Agent Dirham',
  anneeAffectation: 45657,
};

export const sampleWithNewData: NewMatiere = {
  region: NomReg['AUTRE'],
  codeRegion: CodeRegion['C11'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
