import { IChefEtablissement } from 'app/entities/chef-etablissement/chef-etablissement.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';

export interface IApprenant {
  id?: number;
  matriculeApp?: string | null;
  nom?: string;
  prenom?: string;
  sexe?: Sexe;
  telephone?: string;
  email?: string;
  chefEtablissement?: IChefEtablissement | null;
  etablissement?: IEtablissement | null;
  nomLycetech?: INomLycetech | null;
  nomCFP?: INomCFP | null;
}

export class Apprenant implements IApprenant {
  constructor(
    public id?: number,
    public matriculeApp?: string | null,
    public nom?: string,
    public prenom?: string,
    public sexe?: Sexe,
    public telephone?: string,
    public email?: string,
    public chefEtablissement?: IChefEtablissement | null,
    public etablissement?: IEtablissement | null,
    public nomLycetech?: INomLycetech | null,
    public nomCFP?: INomCFP | null
  ) {}
}

export function getApprenantIdentifier(apprenant: IApprenant): number | undefined {
  return apprenant.id;
}
