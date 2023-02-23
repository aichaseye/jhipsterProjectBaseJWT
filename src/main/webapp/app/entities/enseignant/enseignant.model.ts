import { IBFPA } from 'app/entities/bfpa/bfpa.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';

export interface IEnseignant {
  id?: number;
  matriculeEns?: string | null;
  nom?: string;
  prenom?: string;
  numCI?: string;
  anneeDentree?: string;
  region?: NomReg;
  autreRegion?: string | null;
  codeRegion?: CodeRegion;
  autrecodeRegion?: string | null;
  sexe?: Sexe | null;
  email?: string;
  bFPA?: IBFPA | null;
  etablissement?: IEtablissement | null;
  nomLycetech?: INomLycetech | null;
  nomCFP?: INomCFP | null;
}

export class Enseignant implements IEnseignant {
  constructor(
    public id?: number,
    public matriculeEns?: string | null,
    public nom?: string,
    public prenom?: string,
    public numCI?: string,
    public anneeDentree?: string,
    public region?: NomReg,
    public autreRegion?: string | null,
    public codeRegion?: CodeRegion,
    public autrecodeRegion?: string | null,
    public sexe?: Sexe | null,
    public email?: string,
    public bFPA?: IBFPA | null,
    public etablissement?: IEtablissement | null,
    public nomLycetech?: INomLycetech | null,
    public nomCFP?: INomCFP | null
  ) {}
}

export function getEnseignantIdentifier(enseignant: IEnseignant): number | undefined {
  return enseignant.id;
}
