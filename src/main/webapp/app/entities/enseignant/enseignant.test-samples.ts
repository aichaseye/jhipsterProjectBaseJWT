import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';

import { IEnseignant, NewEnseignant } from './enseignant.model';

export const sampleWithRequiredData: IEnseignant = {
  id: 64580,
  nom: 'Bénin info-mediaries',
  prenom: 'user-facing',
  numCI: 'Chair',
  anneeDentree: 'real-time bypass Soap',
  region: NomReg['THIES'],
  codeRegion: CodeRegion['C03'],
  email: 'Japhet_Julien@hotmail.fr',
};

export const sampleWithPartialData: IEnseignant = {
  id: 66361,
  nom: 'Sleek',
  prenom: 'Rustic b Technicien',
  numCI: 'des hacking b',
  anneeDentree: 'b Cambridgeshire',
  region: NomReg['TAMBACOUNDA'],
  codeRegion: CodeRegion['C06'],
  autrecodeRegion: 'Directeur',
  email: 'Alcime.Faure59@gmail.com',
};

export const sampleWithFullData: IEnseignant = {
  id: 68565,
  matriculeEns: 'Seamless',
  nom: 'b 17(E.U.A.-17) synthesizing',
  prenom: 'Bike JSON',
  numCI: 'quantify',
  anneeDentree: 'AI Investment',
  region: NomReg['SAINT_LOUIS'],
  autreRegion: 'Plastic',
  codeRegion: CodeRegion['C02'],
  autrecodeRegion: 'Swiss',
  sexe: Sexe['F'],
  email: 'Marie51@yahoo.fr',
};

export const sampleWithNewData: NewEnseignant = {
  nom: 'bandwidth Incredible Fish',
  prenom: 'Oberkampf models back-end',
  numCI: 'indexing Developpeur',
  anneeDentree: 'Account withdrawal card',
  region: NomReg['LOUGA'],
  codeRegion: CodeRegion['C11'],
  email: 'Merlin_Fournier@gmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
