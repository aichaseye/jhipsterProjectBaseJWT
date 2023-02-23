import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBFPA, NewBFPA } from '../bfpa.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBFPA for edit and NewBFPAFormGroupInput for create.
 */
type BFPAFormGroupInput = IBFPA | PartialWithRequiredKeyOf<NewBFPA>;

type BFPAFormDefaults = Pick<NewBFPA, 'id'>;

type BFPAFormGroupContent = {
  id: FormControl<IBFPA['id'] | NewBFPA['id']>;
  nomPrenom: FormControl<IBFPA['nomPrenom']>;
  user: FormControl<IBFPA['user']>;
};

export type BFPAFormGroup = FormGroup<BFPAFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BFPAFormService {
  createBFPAFormGroup(bFPA: BFPAFormGroupInput = { id: null }): BFPAFormGroup {
    const bFPARawValue = {
      ...this.getFormDefaults(),
      ...bFPA,
    };
    return new FormGroup<BFPAFormGroupContent>({
      id: new FormControl(
        { value: bFPARawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomPrenom: new FormControl(bFPARawValue.nomPrenom, {
        validators: [Validators.required],
      }),
      user: new FormControl(bFPARawValue.user),
    });
  }

  getBFPA(form: BFPAFormGroup): IBFPA | NewBFPA {
    return form.getRawValue() as IBFPA | NewBFPA;
  }

  resetForm(form: BFPAFormGroup, bFPA: BFPAFormGroupInput): void {
    const bFPARawValue = { ...this.getFormDefaults(), ...bFPA };
    form.reset(
      {
        ...bFPARawValue,
        id: { value: bFPARawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BFPAFormDefaults {
    return {
      id: null,
    };
  }
}
