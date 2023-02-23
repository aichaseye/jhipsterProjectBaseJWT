import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEnseignant, Enseignant } from '../enseignant.model';
import { EnseignantService } from '../service/enseignant.service';
import { IBFPA } from 'app/entities/bfpa/bfpa.model';
import { BFPAService } from 'app/entities/bfpa/service/bfpa.service';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { Sexe } from 'app/entities/enumerations/sexe.model';

@Component({
  selector: 'jhi-enseignant-update',
  templateUrl: './enseignant-update.component.html',
})
export class EnseignantUpdateComponent implements OnInit {
  isSaving = false;
  nomRegValues = Object.keys(NomReg);
  codeRegionValues = Object.keys(CodeRegion);
  sexeValues = Object.keys(Sexe);

  bFPASSharedCollection: IBFPA[] = [];
  etablissementsSharedCollection: IEtablissement[] = [];
  nomLycetechesSharedCollection: INomLycetech[] = [];
  nomCFPSSharedCollection: INomCFP[] = [];

  editForm = this.fb.group({
    id: [],
    matriculeEns: [null, []],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    numCI: [null, [Validators.required]],
    anneeDentree: [null, [Validators.required]],
    region: [null, [Validators.required]],
    autreRegion: [],
    codeRegion: [null, [Validators.required]],
    autrecodeRegion: [],
    sexe: [],
    email: [null, [Validators.required]],
    bFPA: [],
    etablissement: [],
    nomLycetech: [],
    nomCFP: [],
  });

  constructor(
    protected enseignantService: EnseignantService,
    protected bFPAService: BFPAService,
    protected etablissementService: EtablissementService,
    protected nomLycetechService: NomLycetechService,
    protected nomCFPService: NomCFPService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enseignant }) => {
      this.updateForm(enseignant);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enseignant = this.createFromForm();
    if (enseignant.id !== undefined) {
      this.subscribeToSaveResponse(this.enseignantService.update(enseignant));
    } else {
      this.subscribeToSaveResponse(this.enseignantService.create(enseignant));
    }
  }

  trackBFPAById(index: number, item: IBFPA): number {
    return item.id!;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnseignant>>): void {
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

  protected updateForm(enseignant: IEnseignant): void {
    this.editForm.patchValue({
      id: enseignant.id,
      matriculeEns: enseignant.matriculeEns,
      nom: enseignant.nom,
      prenom: enseignant.prenom,
      numCI: enseignant.numCI,
      anneeDentree: enseignant.anneeDentree,
      region: enseignant.region,
      autreRegion: enseignant.autreRegion,
      codeRegion: enseignant.codeRegion,
      autrecodeRegion: enseignant.autrecodeRegion,
      sexe: enseignant.sexe,
      email: enseignant.email,
      bFPA: enseignant.bFPA,
      etablissement: enseignant.etablissement,
      nomLycetech: enseignant.nomLycetech,
      nomCFP: enseignant.nomCFP,
    });

    this.bFPASSharedCollection = this.bFPAService.addBFPAToCollectionIfMissing(this.bFPASSharedCollection, enseignant.bFPA);
    this.etablissementsSharedCollection = this.etablissementService.addEtablissementToCollectionIfMissing(
      this.etablissementsSharedCollection,
      enseignant.etablissement
    );
    this.nomLycetechesSharedCollection = this.nomLycetechService.addNomLycetechToCollectionIfMissing(
      this.nomLycetechesSharedCollection,
      enseignant.nomLycetech
    );
    this.nomCFPSSharedCollection = this.nomCFPService.addNomCFPToCollectionIfMissing(this.nomCFPSSharedCollection, enseignant.nomCFP);
  }

  protected loadRelationshipsOptions(): void {
    this.bFPAService
      .query()
      .pipe(map((res: HttpResponse<IBFPA[]>) => res.body ?? []))
      .pipe(map((bFPAS: IBFPA[]) => this.bFPAService.addBFPAToCollectionIfMissing(bFPAS, this.editForm.get('bFPA')!.value)))
      .subscribe((bFPAS: IBFPA[]) => (this.bFPASSharedCollection = bFPAS));

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

  protected createFromForm(): IEnseignant {
    return {
      ...new Enseignant(),
      id: this.editForm.get(['id'])!.value,
      matriculeEns: this.editForm.get(['matriculeEns'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      numCI: this.editForm.get(['numCI'])!.value,
      anneeDentree: this.editForm.get(['anneeDentree'])!.value,
      region: this.editForm.get(['region'])!.value,
      autreRegion: this.editForm.get(['autreRegion'])!.value,
      codeRegion: this.editForm.get(['codeRegion'])!.value,
      autrecodeRegion: this.editForm.get(['autrecodeRegion'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      email: this.editForm.get(['email'])!.value,
      bFPA: this.editForm.get(['bFPA'])!.value,
      etablissement: this.editForm.get(['etablissement'])!.value,
      nomLycetech: this.editForm.get(['nomLycetech'])!.value,
      nomCFP: this.editForm.get(['nomCFP'])!.value,
    };
  }
}
