import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEtablissement, Etablissement } from '../etablissement.model';
import { EtablissementService } from '../service/etablissement.service';
import { IBFPA } from 'app/entities/bfpa/bfpa.model';
import { BFPAService } from 'app/entities/bfpa/service/bfpa.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { TypeEtab } from 'app/entities/enumerations/type-etab.model';
import { StatutEtab } from 'app/entities/enumerations/statut-etab.model';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { NomDep } from 'app/entities/enumerations/nom-dep.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { TypeInspection } from 'app/entities/enumerations/type-inspection.model';

@Component({
  selector: 'jhi-etablissement-update',
  templateUrl: './etablissement-update.component.html',
})
export class EtablissementUpdateComponent implements OnInit {
  isSaving = false;
  typeEtabValues = Object.keys(TypeEtab);
  statutEtabValues = Object.keys(StatutEtab);
  nomRegValues = Object.keys(NomReg);
  nomDepValues = Object.keys(NomDep);
  codeRegionValues = Object.keys(CodeRegion);
  typeInspectionValues = Object.keys(TypeInspection);

  bFPASSharedCollection: IBFPA[] = [];
  nomCFPSSharedCollection: INomCFP[] = [];
  nomLycetechesSharedCollection: INomLycetech[] = [];

  editForm = this.fb.group({
    id: [],
    matriculeEtab: [null, []],
    typeEtab: [null, [Validators.required]],
    autrenomEtab: [],
    anneeCre: [],
    statut: [],
    region: [],
    autreRegion: [],
    departement: [],
    autreDep: [],
    commune: [],
    codeRegion: [],
    autrecodeRegion: [],
    emailEtab: [],
    typeInsp: [],
    bFPA: [],
    nomCFP: [],
    nomLycetech: [],
  });

  constructor(
    protected etablissementService: EtablissementService,
    protected bFPAService: BFPAService,
    protected nomCFPService: NomCFPService,
    protected nomLycetechService: NomLycetechService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etablissement }) => {
      this.updateForm(etablissement);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etablissement = this.createFromForm();
    if (etablissement.id !== undefined) {
      this.subscribeToSaveResponse(this.etablissementService.update(etablissement));
    } else {
      this.subscribeToSaveResponse(this.etablissementService.create(etablissement));
    }
  }

  trackBFPAById(index: number, item: IBFPA): number {
    return item.id!;
  }

  trackNomCFPById(index: number, item: INomCFP): number {
    return item.id!;
  }

  trackNomLycetechById(index: number, item: INomLycetech): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtablissement>>): void {
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

  protected updateForm(etablissement: IEtablissement): void {
    this.editForm.patchValue({
      id: etablissement.id,
      matriculeEtab: etablissement.matriculeEtab,
      typeEtab: etablissement.typeEtab,
      autrenomEtab: etablissement.autrenomEtab,
      anneeCre: etablissement.anneeCre,
      statut: etablissement.statut,
      region: etablissement.region,
      autreRegion: etablissement.autreRegion,
      departement: etablissement.departement,
      autreDep: etablissement.autreDep,
      commune: etablissement.commune,
      codeRegion: etablissement.codeRegion,
      autrecodeRegion: etablissement.autrecodeRegion,
      emailEtab: etablissement.emailEtab,
      typeInsp: etablissement.typeInsp,
      bFPA: etablissement.bFPA,
      nomCFP: etablissement.nomCFP,
      nomLycetech: etablissement.nomLycetech,
    });

    this.bFPASSharedCollection = this.bFPAService.addBFPAToCollectionIfMissing(this.bFPASSharedCollection, etablissement.bFPA);
    this.nomCFPSSharedCollection = this.nomCFPService.addNomCFPToCollectionIfMissing(this.nomCFPSSharedCollection, etablissement.nomCFP);
    this.nomLycetechesSharedCollection = this.nomLycetechService.addNomLycetechToCollectionIfMissing(
      this.nomLycetechesSharedCollection,
      etablissement.nomLycetech
    );
  }

  protected loadRelationshipsOptions(): void {
    this.bFPAService
      .query()
      .pipe(map((res: HttpResponse<IBFPA[]>) => res.body ?? []))
      .pipe(map((bFPAS: IBFPA[]) => this.bFPAService.addBFPAToCollectionIfMissing(bFPAS, this.editForm.get('bFPA')!.value)))
      .subscribe((bFPAS: IBFPA[]) => (this.bFPASSharedCollection = bFPAS));

    this.nomCFPService
      .query()
      .pipe(map((res: HttpResponse<INomCFP[]>) => res.body ?? []))
      .pipe(map((nomCFPS: INomCFP[]) => this.nomCFPService.addNomCFPToCollectionIfMissing(nomCFPS, this.editForm.get('nomCFP')!.value)))
      .subscribe((nomCFPS: INomCFP[]) => (this.nomCFPSSharedCollection = nomCFPS));

    this.nomLycetechService
      .query()
      .pipe(map((res: HttpResponse<INomLycetech[]>) => res.body ?? []))
      .pipe(
        map((nomLyceteches: INomLycetech[]) =>
          this.nomLycetechService.addNomLycetechToCollectionIfMissing(nomLyceteches, this.editForm.get('nomLycetech')!.value)
        )
      )
      .subscribe((nomLyceteches: INomLycetech[]) => (this.nomLycetechesSharedCollection = nomLyceteches));
  }

  protected createFromForm(): IEtablissement {
    return {
      ...new Etablissement(),
      id: this.editForm.get(['id'])!.value,
      matriculeEtab: this.editForm.get(['matriculeEtab'])!.value,
      typeEtab: this.editForm.get(['typeEtab'])!.value,
      autrenomEtab: this.editForm.get(['autrenomEtab'])!.value,
      anneeCre: this.editForm.get(['anneeCre'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      region: this.editForm.get(['region'])!.value,
      autreRegion: this.editForm.get(['autreRegion'])!.value,
      departement: this.editForm.get(['departement'])!.value,
      autreDep: this.editForm.get(['autreDep'])!.value,
      commune: this.editForm.get(['commune'])!.value,
      codeRegion: this.editForm.get(['codeRegion'])!.value,
      autrecodeRegion: this.editForm.get(['autrecodeRegion'])!.value,
      emailEtab: this.editForm.get(['emailEtab'])!.value,
      typeInsp: this.editForm.get(['typeInsp'])!.value,
      bFPA: this.editForm.get(['bFPA'])!.value,
      nomCFP: this.editForm.get(['nomCFP'])!.value,
      nomLycetech: this.editForm.get(['nomLycetech'])!.value,
    };
  }
}
