import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { TypeStructure } from 'app/entities/enumerations/type-structure.model';

export interface IMatiere {
  id?: number;
  nomMatiere?: string | null;
  reference?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  matriculeMatiere?: string | null;
  region?: NomReg;
  autreRegion?: string | null;
  codeRegion?: CodeRegion;
  autrecodeRegion?: string | null;
  typeStructure?: TypeStructure | null;
  autreStructure?: string | null;
  anneeAffectation?: number | null;
  comptableMatiere?: IComptableMatiere | null;
  etablissement?: IEtablissement | null;
  nomLycetech?: INomLycetech | null;
  nomCFP?: INomCFP | null;
}

export class Matiere implements IMatiere {
  constructor(
    public id?: number,
    public nomMatiere?: string | null,
    public reference?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public matriculeMatiere?: string | null,
    public region?: NomReg,
    public autreRegion?: string | null,
    public codeRegion?: CodeRegion,
    public autrecodeRegion?: string | null,
    public typeStructure?: TypeStructure | null,
    public autreStructure?: string | null,
    public anneeAffectation?: number | null,
    public comptableMatiere?: IComptableMatiere | null,
    public etablissement?: IEtablissement | null,
    public nomLycetech?: INomLycetech | null,
    public nomCFP?: INomCFP | null
  ) {}
}

export function getMatiereIdentifier(matiere: IMatiere): number | undefined {
  return matiere.id;
}
