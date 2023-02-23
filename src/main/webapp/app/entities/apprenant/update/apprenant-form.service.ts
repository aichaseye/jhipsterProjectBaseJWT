import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IApprenant, NewApprenant } from '../apprenant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApprenant for edit and NewApprenantFormGroupInput for create.
 */
type ApprenantFormGroupInput = IApprenant | PartialWithRequiredKeyOf<NewApprenant>;

type ApprenantFormDefaults = Pick<NewApprenant, 'id'>;

type ApprenantFormGroupContent = {
  id: FormControl<IApprenant['id'] | NewApprenant['id']>;
  matriculeApp: FormControl<IApprenant['matriculeApp']>;
  nom: FormControl<IApprenant['nom']>;
  prenom: FormControl<IApprenant['prenom']>;
  sexe: FormControl<IApprenant['sexe']>;
  telephone: FormControl<IApprenant['telephone']>;
  email: FormControl<IApprenant['email']>;
  chefEtablissement: FormControl<IApprenant['chefEtablissement']>;
  etablissement: FormControl<IApprenant['etablissement']>;
  nomLycetech: FormControl<IApprenant['nomLycetech']>;
  nomCFP: FormControl<IApprenant['nomCFP']>;
};

export type ApprenantFormGroup = FormGroup<ApprenantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApprenantFormService {
  createApprenantFormGroup(apprenant: ApprenantFormGroupInput = { id: null }): ApprenantFormGroup {
    const apprenantRawValue = {
      ...this.getFormDefaults(),
      ...apprenant,
    };
    return new FormGroup<ApprenantFormGroupContent>({
      id: new FormControl(
        { value: apprenantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      matriculeApp: new FormControl(apprenantRawValue.matriculeApp),
      nom: new FormControl(apprenantRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(apprenantRawValue.prenom, {
        validators: [Validators.required],
      }),
      sexe: new FormControl(apprenantRawValue.sexe, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(apprenantRawValue.telephone, {
        validators: [Validators.required],
      }),
      email: new FormControl(apprenantRawValue.email, {
        validators: [Validators.required],
      }),
      chefEtablissement: new FormControl(apprenantRawValue.chefEtablissement),
      etablissement: new FormControl(apprenantRawValue.etablissement),
      nomLycetech: new FormControl(apprenantRawValue.nomLycetech),
      nomCFP: new FormControl(apprenantRawValue.nomCFP),
    });
  }

  getApprenant(form: ApprenantFormGroup): IApprenant | NewApprenant {
    return form.getRawValue() as IApprenant | NewApprenant;
  }

  resetForm(form: ApprenantFormGroup, apprenant: ApprenantFormGroupInput): void {
    const apprenantRawValue = { ...this.getFormDefaults(), ...apprenant };
    form.reset(
      {
        ...apprenantRawValue,
        id: { value: apprenantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApprenantFormDefaults {
    return {
      id: null,
    };
  }
}
