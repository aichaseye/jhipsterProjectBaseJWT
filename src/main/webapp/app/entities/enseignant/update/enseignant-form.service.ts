import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEnseignant, NewEnseignant } from '../enseignant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEnseignant for edit and NewEnseignantFormGroupInput for create.
 */
type EnseignantFormGroupInput = IEnseignant | PartialWithRequiredKeyOf<NewEnseignant>;

type EnseignantFormDefaults = Pick<NewEnseignant, 'id'>;

type EnseignantFormGroupContent = {
  id: FormControl<IEnseignant['id'] | NewEnseignant['id']>;
  matriculeEns: FormControl<IEnseignant['matriculeEns']>;
  nom: FormControl<IEnseignant['nom']>;
  prenom: FormControl<IEnseignant['prenom']>;
  numCI: FormControl<IEnseignant['numCI']>;
  anneeDentree: FormControl<IEnseignant['anneeDentree']>;
  region: FormControl<IEnseignant['region']>;
  autreRegion: FormControl<IEnseignant['autreRegion']>;
  codeRegion: FormControl<IEnseignant['codeRegion']>;
  autrecodeRegion: FormControl<IEnseignant['autrecodeRegion']>;
  sexe: FormControl<IEnseignant['sexe']>;
  email: FormControl<IEnseignant['email']>;
  bFPA: FormControl<IEnseignant['bFPA']>;
  etablissement: FormControl<IEnseignant['etablissement']>;
  nomLycetech: FormControl<IEnseignant['nomLycetech']>;
  nomCFP: FormControl<IEnseignant['nomCFP']>;
};

export type EnseignantFormGroup = FormGroup<EnseignantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EnseignantFormService {
  createEnseignantFormGroup(enseignant: EnseignantFormGroupInput = { id: null }): EnseignantFormGroup {
    const enseignantRawValue = {
      ...this.getFormDefaults(),
      ...enseignant,
    };
    return new FormGroup<EnseignantFormGroupContent>({
      id: new FormControl(
        { value: enseignantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      matriculeEns: new FormControl(enseignantRawValue.matriculeEns),
      nom: new FormControl(enseignantRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(enseignantRawValue.prenom, {
        validators: [Validators.required],
      }),
      numCI: new FormControl(enseignantRawValue.numCI, {
        validators: [Validators.required],
      }),
      anneeDentree: new FormControl(enseignantRawValue.anneeDentree, {
        validators: [Validators.required],
      }),
      region: new FormControl(enseignantRawValue.region, {
        validators: [Validators.required],
      }),
      autreRegion: new FormControl(enseignantRawValue.autreRegion),
      codeRegion: new FormControl(enseignantRawValue.codeRegion, {
        validators: [Validators.required],
      }),
      autrecodeRegion: new FormControl(enseignantRawValue.autrecodeRegion),
      sexe: new FormControl(enseignantRawValue.sexe),
      email: new FormControl(enseignantRawValue.email, {
        validators: [Validators.required],
      }),
      bFPA: new FormControl(enseignantRawValue.bFPA),
      etablissement: new FormControl(enseignantRawValue.etablissement),
      nomLycetech: new FormControl(enseignantRawValue.nomLycetech),
      nomCFP: new FormControl(enseignantRawValue.nomCFP),
    });
  }

  getEnseignant(form: EnseignantFormGroup): IEnseignant | NewEnseignant {
    return form.getRawValue() as IEnseignant | NewEnseignant;
  }

  resetForm(form: EnseignantFormGroup, enseignant: EnseignantFormGroupInput): void {
    const enseignantRawValue = { ...this.getFormDefaults(), ...enseignant };
    form.reset(
      {
        ...enseignantRawValue,
        id: { value: enseignantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EnseignantFormDefaults {
    return {
      id: null,
    };
  }
}
