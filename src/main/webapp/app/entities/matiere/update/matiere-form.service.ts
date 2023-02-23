import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IMatiere, NewMatiere } from '../matiere.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMatiere for edit and NewMatiereFormGroupInput for create.
 */
type MatiereFormGroupInput = IMatiere | PartialWithRequiredKeyOf<NewMatiere>;

type MatiereFormDefaults = Pick<NewMatiere, 'id'>;

type MatiereFormGroupContent = {
  id: FormControl<IMatiere['id'] | NewMatiere['id']>;
  nomMatiere: FormControl<IMatiere['nomMatiere']>;
  reference: FormControl<IMatiere['reference']>;
  image: FormControl<IMatiere['image']>;
  imageContentType: FormControl<IMatiere['imageContentType']>;
  matriculeMatiere: FormControl<IMatiere['matriculeMatiere']>;
  region: FormControl<IMatiere['region']>;
  autreRegion: FormControl<IMatiere['autreRegion']>;
  codeRegion: FormControl<IMatiere['codeRegion']>;
  autrecodeRegion: FormControl<IMatiere['autrecodeRegion']>;
  typeStructure: FormControl<IMatiere['typeStructure']>;
  autreStructure: FormControl<IMatiere['autreStructure']>;
  anneeAffectation: FormControl<IMatiere['anneeAffectation']>;
  comptableMatiere: FormControl<IMatiere['comptableMatiere']>;
  etablissement: FormControl<IMatiere['etablissement']>;
  nomLycetech: FormControl<IMatiere['nomLycetech']>;
  nomCFP: FormControl<IMatiere['nomCFP']>;
};

export type MatiereFormGroup = FormGroup<MatiereFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MatiereFormService {
  createMatiereFormGroup(matiere: MatiereFormGroupInput = { id: null }): MatiereFormGroup {
    const matiereRawValue = {
      ...this.getFormDefaults(),
      ...matiere,
    };
    return new FormGroup<MatiereFormGroupContent>({
      id: new FormControl(
        { value: matiereRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nomMatiere: new FormControl(matiereRawValue.nomMatiere),
      reference: new FormControl(matiereRawValue.reference),
      image: new FormControl(matiereRawValue.image),
      imageContentType: new FormControl(matiereRawValue.imageContentType),
      matriculeMatiere: new FormControl(matiereRawValue.matriculeMatiere),
      region: new FormControl(matiereRawValue.region, {
        validators: [Validators.required],
      }),
      autreRegion: new FormControl(matiereRawValue.autreRegion),
      codeRegion: new FormControl(matiereRawValue.codeRegion, {
        validators: [Validators.required],
      }),
      autrecodeRegion: new FormControl(matiereRawValue.autrecodeRegion),
      typeStructure: new FormControl(matiereRawValue.typeStructure),
      autreStructure: new FormControl(matiereRawValue.autreStructure),
      anneeAffectation: new FormControl(matiereRawValue.anneeAffectation),
      comptableMatiere: new FormControl(matiereRawValue.comptableMatiere),
      etablissement: new FormControl(matiereRawValue.etablissement),
      nomLycetech: new FormControl(matiereRawValue.nomLycetech),
      nomCFP: new FormControl(matiereRawValue.nomCFP),
    });
  }

  getMatiere(form: MatiereFormGroup): IMatiere | NewMatiere {
    return form.getRawValue() as IMatiere | NewMatiere;
  }

  resetForm(form: MatiereFormGroup, matiere: MatiereFormGroupInput): void {
    const matiereRawValue = { ...this.getFormDefaults(), ...matiere };
    form.reset(
      {
        ...matiereRawValue,
        id: { value: matiereRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MatiereFormDefaults {
    return {
      id: null,
    };
  }
}
