import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INomCFP, NewNomCFP } from '../nom-cfp.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INomCFP for edit and NewNomCFPFormGroupInput for create.
 */
type NomCFPFormGroupInput = INomCFP | PartialWithRequiredKeyOf<NewNomCFP>;

type NomCFPFormDefaults = Pick<NewNomCFP, 'id'>;

type NomCFPFormGroupContent = {
  id: FormControl<INomCFP['id'] | NewNomCFP['id']>;
  nomCFP: FormControl<INomCFP['nomCFP']>;
};

export type NomCFPFormGroup = FormGroup<NomCFPFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NomCFPFormService {
  createNomCFPFormGroup(nomCFP: NomCFPFormGroupInput = { id: null }): NomCFPFormGroup {
    const nomCFPRawValue = {
      ...this.getFormDefaults(),
      ...nomCFP,
    };
    return new FormGroup<NomCFPFormGroupContent>({
      id: new FormControl(
        { value: nomCFPRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomCFP: new FormControl(nomCFPRawValue.nomCFP),
    });
  }

  getNomCFP(form: NomCFPFormGroup): INomCFP | NewNomCFP {
    return form.getRawValue() as INomCFP | NewNomCFP;
  }

  resetForm(form: NomCFPFormGroup, nomCFP: NomCFPFormGroupInput): void {
    const nomCFPRawValue = { ...this.getFormDefaults(), ...nomCFP };
    form.reset(
      {
        ...nomCFPRawValue,
        id: { value: nomCFPRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NomCFPFormDefaults {
    return {
      id: null,
    };
  }
}
