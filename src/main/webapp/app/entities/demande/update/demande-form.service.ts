import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDemande, NewDemande } from '../demande.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDemande for edit and NewDemandeFormGroupInput for create.
 */
type DemandeFormGroupInput = IDemande | PartialWithRequiredKeyOf<NewDemande>;

type DemandeFormDefaults = Pick<NewDemande, 'id'>;

type DemandeFormGroupContent = {
  id: FormControl<IDemande['id'] | NewDemande['id']>;
  motif: FormControl<IDemande['motif']>;
  typeDemandeur: FormControl<IDemande['typeDemandeur']>;
  nom: FormControl<IDemande['nom']>;
  prenom: FormControl<IDemande['prenom']>;
  email: FormControl<IDemande['email']>;
  etablissement: FormControl<IDemande['etablissement']>;
  nomLycetech: FormControl<IDemande['nomLycetech']>;
  nomCFP: FormControl<IDemande['nomCFP']>;
};

export type DemandeFormGroup = FormGroup<DemandeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DemandeFormService {
  createDemandeFormGroup(demande: DemandeFormGroupInput = { id: null }): DemandeFormGroup {
    const demandeRawValue = {
      ...this.getFormDefaults(),
      ...demande,
    };
    return new FormGroup<DemandeFormGroupContent>({
      id: new FormControl(
        { value: demandeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      motif: new FormControl(demandeRawValue.motif),
      typeDemandeur: new FormControl(demandeRawValue.typeDemandeur),
      nom: new FormControl(demandeRawValue.nom),
      prenom: new FormControl(demandeRawValue.prenom),
      email: new FormControl(demandeRawValue.email, {
        validators: [Validators.required],
      }),
      etablissement: new FormControl(demandeRawValue.etablissement),
      nomLycetech: new FormControl(demandeRawValue.nomLycetech),
      nomCFP: new FormControl(demandeRawValue.nomCFP),
    });
  }

  getDemande(form: DemandeFormGroup): IDemande | NewDemande {
    return form.getRawValue() as IDemande | NewDemande;
  }

  resetForm(form: DemandeFormGroup, demande: DemandeFormGroupInput): void {
    const demandeRawValue = { ...this.getFormDefaults(), ...demande };
    form.reset(
      {
        ...demandeRawValue,
        id: { value: demandeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DemandeFormDefaults {
    return {
      id: null,
    };
  }
}
