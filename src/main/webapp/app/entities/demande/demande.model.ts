import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { Motif } from 'app/entities/enumerations/motif.model';
import { TypeDemandeur } from 'app/entities/enumerations/type-demandeur.model';

export interface IDemande {
  id?: number;
  motif?: Motif | null;
  typeDemandeur?: TypeDemandeur | null;
  nom?: string | null;
  prenom?: string | null;
  email?: string;
  etablissement?: IEtablissement | null;
  nomLycetech?: INomLycetech | null;
  nomCFP?: INomCFP | null;
}

export class Demande implements IDemande {
  constructor(
    public id?: number,
    public motif?: Motif | null,
    public typeDemandeur?: TypeDemandeur | null,
    public nom?: string | null,
    public prenom?: string | null,
    public email?: string,
    public etablissement?: IEtablissement | null,
    public nomLycetech?: INomLycetech | null,
    public nomCFP?: INomCFP | null
  ) {}
}

export function getDemandeIdentifier(demande: IDemande): number | undefined {
  return demande.id;
}
