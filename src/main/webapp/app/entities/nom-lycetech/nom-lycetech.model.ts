import { IApprenant } from 'app/entities/apprenant/apprenant.model';
import { IEnseignant } from 'app/entities/enseignant/enseignant.model';
import { IMatiere } from 'app/entities/matiere/matiere.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { IDemande } from 'app/entities/demande/demande.model';

export interface INomLycetech {
  id?: number;
  nomLycee?: string | null;
  apprenants?: IApprenant[] | null;
  enseignants?: IEnseignant[] | null;
  matieres?: IMatiere[] | null;
  etablissements?: IEtablissement[] | null;
  demandes?: IDemande[] | null;
}

export class NomLycetech implements INomLycetech {
  constructor(
    public id?: number,
    public nomLycee?: string | null,
    public apprenants?: IApprenant[] | null,
    public enseignants?: IEnseignant[] | null,
    public matieres?: IMatiere[] | null,
    public etablissements?: IEtablissement[] | null,
    public demandes?: IDemande[] | null
  ) {}
}

export function getNomLycetechIdentifier(nomLycetech: INomLycetech): number | undefined {
  return nomLycetech.id;
}
