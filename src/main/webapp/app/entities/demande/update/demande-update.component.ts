import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDemande, Demande } from '../demande.model';
import { DemandeService } from '../service/demande.service';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';
import { Motif } from 'app/entities/enumerations/motif.model';
import { TypeDemandeur } from 'app/entities/enumerations/type-demandeur.model';

@Component({
  selector: 'jhi-demande-update',
  templateUrl: './demande-update.component.html',
})
export class DemandeUpdateComponent implements OnInit {
  isSaving = false;
  motifValues = Object.keys(Motif);
  typeDemandeurValues = Object.keys(TypeDemandeur);

  etablissementsSharedCollection: IEtablissement[] = [];
  nomLycetechesSharedCollection: INomLycetech[] = [];
  nomCFPSSharedCollection: INomCFP[] = [];

  editForm = this.fb.group({
    id: [],
    motif: [],
    typeDemandeur: [],
    nom: [],
    prenom: [],
    email: [null, [Validators.required]],
    etablissement: [],
    nomLycetech: [],
    nomCFP: [],
  });

  constructor(
    protected demandeService: DemandeService,
    protected etablissementService: EtablissementService,
    protected nomLycetechService: NomLycetechService,
    protected nomCFPService: NomCFPService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      this.updateForm(demande);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demande = this.createFromForm();
    if (demande.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeService.update(demande));
    } else {
      this.subscribeToSaveResponse(this.demandeService.create(demande));
    }
  }

  trackEtablissementById(index: number, item: IEtablissement): number {
    return item.id!;
  }

  trackNomLycetechById(index: number, item: INomLycetech): number {
    return item.id!;
  }

  trackNomCFPById(index: number, item: INomCFP): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemande>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(demande: IDemande): void {
    this.editForm.patchValue({
      id: demande.id,
      motif: demande.motif,
      typeDemandeur: demande.typeDemandeur,
      nom: demande.nom,
      prenom: demande.prenom,
      email: demande.email,
      etablissement: demande.etablissement,
      nomLycetech: demande.nomLycetech,
      nomCFP: demande.nomCFP,
    });

    this.etablissementsSharedCollection = this.etablissementService.addEtablissementToCollectionIfMissing(
      this.etablissementsSharedCollection,
      demande.etablissement
    );
    this.nomLycetechesSharedCollection = this.nomLycetechService.addNomLycetechToCollectionIfMissing(
      this.nomLycetechesSharedCollection,
      demande.nomLycetech
    );
    this.nomCFPSSharedCollection = this.nomCFPService.addNomCFPToCollectionIfMissing(this.nomCFPSSharedCollection, demande.nomCFP);
  }

  protected loadRelationshipsOptions(): void {
    this.etablissementService
      .query()
      .pipe(map((res: HttpResponse<IEtablissement[]>) => res.body ?? []))
      .pipe(
        map((etablissements: IEtablissement[]) =>
          this.etablissementService.addEtablissementToCollectionIfMissing(etablissements, this.editForm.get('etablissement')!.value)
        )
      )
      .subscribe((etablissements: IEtablissement[]) => (this.etablissementsSharedCollection = etablissements));

    this.nomLycetechService
      .query()
      .pipe(map((res: HttpResponse<INomLycetech[]>) => res.body ?? []))
      .pipe(
        map((nomLyceteches: INomLycetech[]) =>
          this.nomLycetechService.addNomLycetechToCollectionIfMissing(nomLyceteches, this.editForm.get('nomLycetech')!.value)
        )
      )
      .subscribe((nomLyceteches: INomLycetech[]) => (this.nomLycetechesSharedCollection = nomLyceteches));

    this.nomCFPService
      .query()
      .pipe(map((res: HttpResponse<INomCFP[]>) => res.body ?? []))
      .pipe(map((nomCFPS: INomCFP[]) => this.nomCFPService.addNomCFPToCollectionIfMissing(nomCFPS, this.editForm.get('nomCFP')!.value)))
      .subscribe((nomCFPS: INomCFP[]) => (this.nomCFPSSharedCollection = nomCFPS));
  }

  protected createFromForm(): IDemande {
    return {
      ...new Demande(),
      id: this.editForm.get(['id'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      typeDemandeur: this.editForm.get(['typeDemandeur'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      email: this.editForm.get(['email'])!.value,
      etablissement: this.editForm.get(['etablissement'])!.value,
      nomLycetech: this.editForm.get(['nomLycetech'])!.value,
      nomCFP: this.editForm.get(['nomCFP'])!.value,
    };
  }
}
