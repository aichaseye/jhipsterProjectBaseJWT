import { Sexe } from 'app/entities/enumerations/sexe.model';

import { IApprenant, NewApprenant } from './apprenant.model';

export const sampleWithRequiredData: IApprenant = {
  id: 74353,
  nom: 'moratorium card Operative',
  prenom: 'Aquitaine Generic core',
  sexe: Sexe['F'],
  telephone: '0764233109',
  email: 'Luc.Rousseau@gmail.com',
};

export const sampleWithPartialData: IApprenant = {
  id: 57873,
  matriculeApp: 'Berkshire',
  nom: 'Bonaparte Superviseur',
  prenom: 'Handmade Money',
  sexe: Sexe['M'],
  telephone: '0677878405',
  email: 'Hardouin.Menard34@yahoo.fr',
};

export const sampleWithFullData: IApprenant = {
  id: 37043,
  matriculeApp: 'deliverables Australian Cotton',
  nom: 'Rubber firewall virtual',
  prenom: 'Bedfordshire Jewelery deposit',
  sexe: Sexe['F'],
  telephone: '0336725437',
  email: 'Antigone_Joly64@gmail.com',
};

export const sampleWithNewData: NewApprenant = {
  nom: 'Generic',
  prenom: 'c deposit granular',
  sexe: Sexe['M'],
  telephone: '0124359862',
  email: 'Fanny30@hotmail.fr',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
