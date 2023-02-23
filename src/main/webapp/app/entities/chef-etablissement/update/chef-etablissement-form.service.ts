import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IChefEtablissement, NewChefEtablissement } from '../chef-etablissement.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IChefEtablissement for edit and NewChefEtablissementFormGroupInput for create.
 */
type ChefEtablissementFormGroupInput = IChefEtablissement | PartialWithRequiredKeyOf<NewChefEtablissement>;

type ChefEtablissementFormDefaults = Pick<NewChefEtablissement, 'id'>;

type ChefEtablissementFormGroupContent = {
  id: FormControl<IChefEtablissement['id'] | NewChefEtablissement['id']>;
  nomPrenom: FormControl<IChefEtablissement['nomPrenom']>;
  user: FormControl<IChefEtablissement['user']>;
};

export type ChefEtablissementFormGroup = FormGroup<ChefEtablissementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ChefEtablissementFormService {
  createChefEtablissementFormGroup(chefEtablissement: ChefEtablissementFormGroupInput = { id: null }): ChefEtablissementFormGroup {
    const chefEtablissementRawValue = {
      ...this.getFormDefaults(),
      ...chefEtablissement,
    };
    return new FormGroup<ChefEtablissementFormGroupContent>({
      id: new FormControl(
        { value: chefEtablissementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomPrenom: new FormControl(chefEtablissementRawValue.nomPrenom, {
        validators: [Validators.required],
      }),
      user: new FormControl(chefEtablissementRawValue.user),
    });
  }

  getChefEtablissement(form: ChefEtablissementFormGroup): IChefEtablissement | NewChefEtablissement {
    return form.getRawValue() as IChefEtablissement | NewChefEtablissement;
  }

  resetForm(form: ChefEtablissementFormGroup, chefEtablissement: ChefEtablissementFormGroupInput): void {
    const chefEtablissementRawValue = { ...this.getFormDefaults(), ...chefEtablissement };
    form.reset(
      {
        ...chefEtablissementRawValue,
        id: { value: chefEtablissementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ChefEtablissementFormDefaults {
    return {
      id: null,
    };
  }
}
