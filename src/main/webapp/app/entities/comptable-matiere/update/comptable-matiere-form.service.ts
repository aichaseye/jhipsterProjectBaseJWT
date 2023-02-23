import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComptableMatiere, NewComptableMatiere } from '../comptable-matiere.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComptableMatiere for edit and NewComptableMatiereFormGroupInput for create.
 */
type ComptableMatiereFormGroupInput = IComptableMatiere | PartialWithRequiredKeyOf<NewComptableMatiere>;

type ComptableMatiereFormDefaults = Pick<NewComptableMatiere, 'id'>;

type ComptableMatiereFormGroupContent = {
  id: FormControl<IComptableMatiere['id'] | NewComptableMatiere['id']>;
  nomPrenom: FormControl<IComptableMatiere['nomPrenom']>;
  user: FormControl<IComptableMatiere['user']>;
};

export type ComptableMatiereFormGroup = FormGroup<ComptableMatiereFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComptableMatiereFormService {
  createComptableMatiereFormGroup(comptableMatiere: ComptableMatiereFormGroupInput = { id: null }): ComptableMatiereFormGroup {
    const comptableMatiereRawValue = {
      ...this.getFormDefaults(),
      ...comptableMatiere,
    };
    return new FormGroup<ComptableMatiereFormGroupContent>({
      id: new FormControl(
        { value: comptableMatiereRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomPrenom: new FormControl(comptableMatiereRawValue.nomPrenom, {
        validators: [Validators.required],
      }),
      user: new FormControl(comptableMatiereRawValue.user),
    });
  }

  getComptableMatiere(form: ComptableMatiereFormGroup): IComptableMatiere | NewComptableMatiere {
    return form.getRawValue() as IComptableMatiere | NewComptableMatiere;
  }

  resetForm(form: ComptableMatiereFormGroup, comptableMatiere: ComptableMatiereFormGroupInput): void {
    const comptableMatiereRawValue = { ...this.getFormDefaults(), ...comptableMatiere };
    form.reset(
      {
        ...comptableMatiereRawValue,
        id: { value: comptableMatiereRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ComptableMatiereFormDefaults {
    return {
      id: null,
    };
  }
}
