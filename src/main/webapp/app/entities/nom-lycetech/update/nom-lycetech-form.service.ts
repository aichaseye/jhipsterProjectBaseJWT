import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INomLycetech, NewNomLycetech } from '../nom-lycetech.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INomLycetech for edit and NewNomLycetechFormGroupInput for create.
 */
type NomLycetechFormGroupInput = INomLycetech | PartialWithRequiredKeyOf<NewNomLycetech>;

type NomLycetechFormDefaults = Pick<NewNomLycetech, 'id'>;

type NomLycetechFormGroupContent = {
  id: FormControl<INomLycetech['id'] | NewNomLycetech['id']>;
  nomLycee: FormControl<INomLycetech['nomLycee']>;
};

export type NomLycetechFormGroup = FormGroup<NomLycetechFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NomLycetechFormService {
  createNomLycetechFormGroup(nomLycetech: NomLycetechFormGroupInput = { id: null }): NomLycetechFormGroup {
    const nomLycetechRawValue = {
      ...this.getFormDefaults(),
      ...nomLycetech,
    };
    return new FormGroup<NomLycetechFormGroupContent>({
      id: new FormControl(
        { value: nomLycetechRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomLycee: new FormControl(nomLycetechRawValue.nomLycee),
    });
  }

  getNomLycetech(form: NomLycetechFormGroup): INomLycetech | NewNomLycetech {
    return form.getRawValue() as INomLycetech | NewNomLycetech;
  }

  resetForm(form: NomLycetechFormGroup, nomLycetech: NomLycetechFormGroupInput): void {
    const nomLycetechRawValue = { ...this.getFormDefaults(), ...nomLycetech };
    form.reset(
      {
        ...nomLycetechRawValue,
        id: { value: nomLycetechRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NomLycetechFormDefaults {
    return {
      id: null,
    };
  }
}
