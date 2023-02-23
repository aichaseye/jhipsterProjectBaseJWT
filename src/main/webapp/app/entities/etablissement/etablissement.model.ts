import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { IEnseignant } from 'app/entities/enseignant/enseignant.model';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { IDemande } from 'app/entities/demande/demande.model';
import { IBFPA } from 'app/entities/bfpa/bfpa.model';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { TypeEtab } from 'app/entities/enumerations/type-etab.model';
import { StatutEtab } from 'app/entities/enumerations/statut-etab.model';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { NomDep } from 'app/entities/enumerations/nom-dep.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { TypeInspection } from 'app/entities/enumerations/type-inspection.model';

export interface IEtablissement {
  id?: number;
  matriculeEtab?: string | null;
  typeEtab?: TypeEtab;
  autrenomEtab?: string | null;
  anneeCre?: number | null;
  statut?: StatutEtab | null;
  region?: NomReg | null;
  autreRegion?: string | null;
  departement?: NomDep | null;
  autreDep?: string | null;
  commune?: string | null;
  codeRegion?: CodeRegion | null;
  autrecodeRegion?: string | null;
  emailEtab?: string | null;
  typeInsp?: TypeInspection | null;
  apprenants?: IApprenant[] | null;
  enseignants?: IEnseignant[] | null;
  matieres?: IMatiere[] | null;
  demandes?: IDemande[] | null;
  bFPA?: IBFPA | null;
  nomCFP?: INomCFP | null;
  nomLycetech?: INomLycetech | null;
}

export class Etablissement implements IEtablissement {
  constructor(
    public id?: number,
    public matriculeEtab?: string | null,
    public typeEtab?: TypeEtab,
    public autrenomEtab?: string | null,
    public anneeCre?: number | null,
    public statut?: StatutEtab | null,
    public region?: NomReg | null,
    public autreRegion?: string | null,
    public departement?: NomDep | null,
    public autreDep?: string | null,
    public commune?: string | null,
    public codeRegion?: CodeRegion | null,
    public autrecodeRegion?: string | null,
    public emailEtab?: string | null,
    public typeInsp?: TypeInspection | null,
    public apprenants?: IApprenant[] | null,
    public enseignants?: IEnseignant[] | null,
    public matieres?: IMatiere[] | null,
    public demandes?: IDemande[] | null,
    public bFPA?: IBFPA | null,
    public nomCFP?: INomCFP | null,
    public nomLycetech?: INomLycetech | null
  ) {}
}

export function getEtablissementIdentifier(etablissement: IEtablissement): number | undefined {
  return etablissement.id;
}
