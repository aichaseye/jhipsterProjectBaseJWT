import { Motif } from 'app/entities/enumerations/motif.model';
import { TypeDemandeur } from 'app/entities/enumerations/type-demandeur.model';

import { IDemande, NewDemande } from './demande.model';

export const sampleWithRequiredData: IDemande = {
  id: 19730,
  email: 'Judical53@hotmail.fr',
};

export const sampleWithPartialData: IDemande = {
  id: 48831,
  motif: Motif['CreationMatricule'],
  prenom: 'Handcrafted Hryvnia',
  email: 'Alinor.David@yahoo.fr',
};

export const sampleWithFullData: IDemande = {
  id: 59525,
  motif: Motif['Perte'],
  typeDemandeur: TypeDemandeur['Apprenant'],
  nom: 'Shoes Pays-Bas',
  prenom: 'Executif Cedi Specialiste',
  email: 'Arthur_Vasseur71@hotmail.fr',
};

export const sampleWithNewData: NewDemande = {
  email: 'Ludolphe.Gerard4@gmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
