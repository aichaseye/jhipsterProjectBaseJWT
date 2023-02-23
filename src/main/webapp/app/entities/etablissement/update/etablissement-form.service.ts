import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEtablissement, NewEtablissement } from '../etablissement.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEtablissement for edit and NewEtablissementFormGroupInput for create.
 */
type EtablissementFormGroupInput = IEtablissement | PartialWithRequiredKeyOf<NewEtablissement>;

type EtablissementFormDefaults = Pick<NewEtablissement, 'id'>;

type EtablissementFormGroupContent = {
  id: FormControl<IEtablissement['id'] | NewEtablissement['id']>;
  matriculeEtab: FormControl<IEtablissement['matriculeEtab']>;
  typeEtab: FormControl<IEtablissement['typeEtab']>;
  autrenomEtab: FormControl<IEtablissement['autrenomEtab']>;
  anneeCre: FormControl<IEtablissement['anneeCre']>;
  statut: FormControl<IEtablissement['statut']>;
  region: FormControl<IEtablissement['region']>;
  autreRegion: FormControl<IEtablissement['autreRegion']>;
  departement: FormControl<IEtablissement['departement']>;
  autreDep: FormControl<IEtablissement['autreDep']>;
  commune: FormControl<IEtablissement['commune']>;
  codeRegion: FormControl<IEtablissement['codeRegion']>;
  autrecodeRegion: FormControl<IEtablissement['autrecodeRegion']>;
  emailEtab: FormControl<IEtablissement['emailEtab']>;
  typeInsp: FormControl<IEtablissement['typeInsp']>;
  bFPA: FormControl<IEtablissement['bFPA']>;
  nomCFP: FormControl<IEtablissement['nomCFP']>;
  nomLycetech: FormControl<IEtablissement['nomLycetech']>;
};

export type EtablissementFormGroup = FormGroup<EtablissementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EtablissementFormService {
  createEtablissementFormGroup(etablissement: EtablissementFormGroupInput = { id: null }): EtablissementFormGroup {
    const etablissementRawValue = {
      ...this.getFormDefaults(),
      ...etablissement,
    };
    return new FormGroup<EtablissementFormGroupContent>({
      id: new FormControl(
        { value: etablissementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      matriculeEtab: new FormControl(etablissementRawValue.matriculeEtab),
      typeEtab: new FormControl(etablissementRawValue.typeEtab, {
        validators: [Validators.required],
      }),
      autrenomEtab: new FormControl(etablissementRawValue.autrenomEtab),
      anneeCre: new FormControl(etablissementRawValue.anneeCre),
      statut: new FormControl(etablissementRawValue.statut),
      region: new FormControl(etablissementRawValue.region),
      autreRegion: new FormControl(etablissementRawValue.autreRegion),
      departement: new FormControl(etablissementRawValue.departement),
      autreDep: new FormControl(etablissementRawValue.autreDep),
      commune: new FormControl(etablissementRawValue.commune),
      codeRegion: new FormControl(etablissementRawValue.codeRegion),
      autrecodeRegion: new FormControl(etablissementRawValue.autrecodeRegion),
      emailEtab: new FormControl(etablissementRawValue.emailEtab),
      typeInsp: new FormControl(etablissementRawValue.typeInsp),
      bFPA: new FormControl(etablissementRawValue.bFPA),
      nomCFP: new FormControl(etablissementRawValue.nomCFP),
      nomLycetech: new FormControl(etablissementRawValue.nomLycetech),
    });
  }

  getEtablissement(form: EtablissementFormGroup): IEtablissement | NewEtablissement {
    return form.getRawValue() as IEtablissement | NewEtablissement;
  }

  resetForm(form: EtablissementFormGroup, etablissement: EtablissementFormGroupInput): void {
    const etablissementRawValue = { ...this.getFormDefaults(), ...etablissement };
    form.reset(
      {
        ...etablissementRawValue,
        id: { value: etablissementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EtablissementFormDefaults {
    return {
      id: null,
    };
  }
}
