import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMatiere, Matiere } from '../matiere.model';
import { MatiereService } from '../service/matiere.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';
import { NomReg } from 'app/entities/enumerations/nom-reg.model';
import { CodeRegion } from 'app/entities/enumerations/code-region.model';
import { TypeStructure } from 'app/entities/enumerations/type-structure.model';

@Component({
  selector: 'jhi-matiere-update',
  templateUrl: './matiere-update.component.html',
})
export class MatiereUpdateComponent implements OnInit {
  isSaving = false;
  nomRegValues = Object.keys(NomReg);
  codeRegionValues = Object.keys(CodeRegion);
  typeStructureValues = Object.keys(TypeStructure);

  comptableMatieresSharedCollection: IComptableMatiere[] = [];
  etablissementsSharedCollection: IEtablissement[] = [];
  nomLycetechesSharedCollection: INomLycetech[] = [];
  nomCFPSSharedCollection: INomCFP[] = [];

  editForm = this.fb.group({
    id: [],
    nomMatiere: [],
    reference: [],
    image: [],
    imageContentType: [],
    matriculeMatiere: [null, []],
    region: [null, [Validators.required]],
    autreRegion: [],
    codeRegion: [null, [Validators.required]],
    autrecodeRegion: [],
    typeStructure: [],
    autreStructure: [],
    anneeAffectation: [],
    comptableMatiere: [],
    etablissement: [],
    nomLycetech: [],
    nomCFP: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected matiereService: MatiereService,
    protected comptableMatiereService: ComptableMatiereService,
    protected etablissementService: EtablissementService,
    protected nomLycetechService: NomLycetechService,
    protected nomCFPService: NomCFPService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matiere }) => {
      this.updateForm(matiere);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('jhipsterProjectBaseJwtApp.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const matiere = this.createFromForm();
    if (matiere.id !== undefined) {
      this.subscribeToSaveResponse(this.matiereService.update(matiere));
    } else {
      this.subscribeToSaveResponse(this.matiereService.create(matiere));
    }
  }

  trackComptableMatiereById(index: number, item: IComptableMatiere): number {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatiere>>): void {
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

  protected updateForm(matiere: IMatiere): void {
    this.editForm.patchValue({
      id: matiere.id,
      nomMatiere: matiere.nomMatiere,
      reference: matiere.reference,
      image: matiere.image,
      imageContentType: matiere.imageContentType,
      matriculeMatiere: matiere.matriculeMatiere,
      region: matiere.region,
      autreRegion: matiere.autreRegion,
      codeRegion: matiere.codeRegion,
      autrecodeRegion: matiere.autrecodeRegion,
      typeStructure: matiere.typeStructure,
      autreStructure: matiere.autreStructure,
      anneeAffectation: matiere.anneeAffectation,
      comptableMatiere: matiere.comptableMatiere,
      etablissement: matiere.etablissement,
      nomLycetech: matiere.nomLycetech,
      nomCFP: matiere.nomCFP,
    });

    this.comptableMatieresSharedCollection = this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
      this.comptableMatieresSharedCollection,
      matiere.comptableMatiere
    );
    this.etablissementsSharedCollection = this.etablissementService.addEtablissementToCollectionIfMissing(
      this.etablissementsSharedCollection,
      matiere.etablissement
    );
    this.nomLycetechesSharedCollection = this.nomLycetechService.addNomLycetechToCollectionIfMissing(
      this.nomLycetechesSharedCollection,
      matiere.nomLycetech
    );
    this.nomCFPSSharedCollection = this.nomCFPService.addNomCFPToCollectionIfMissing(this.nomCFPSSharedCollection, matiere.nomCFP);
  }

  protected loadRelationshipsOptions(): void {
    this.comptableMatiereService
      .query()
      .pipe(map((res: HttpResponse<IComptableMatiere[]>) => res.body ?? []))
      .pipe(
        map((comptableMatieres: IComptableMatiere[]) =>
          this.comptableMatiereService.addComptableMatiereToCollectionIfMissing(
            comptableMatieres,
            this.editForm.get('comptableMatiere')!.value
          )
        )
      )
      .subscribe((comptableMatieres: IComptableMatiere[]) => (this.comptableMatieresSharedCollection = comptableMatieres));

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

  protected createFromForm(): IMatiere {
    return {
      ...new Matiere(),
      id: this.editForm.get(['id'])!.value,
      nomMatiere: this.editForm.get(['nomMatiere'])!.value,
      reference: this.editForm.get(['reference'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      matriculeMatiere: this.editForm.get(['matriculeMatiere'])!.value,
      region: this.editForm.get(['region'])!.value,
      autreRegion: this.editForm.get(['autreRegion'])!.value,
      codeRegion: this.editForm.get(['codeRegion'])!.value,
      autrecodeRegion: this.editForm.get(['autrecodeRegion'])!.value,
      typeStructure: this.editForm.get(['typeStructure'])!.value,
      autreStructure: this.editForm.get(['autreStructure'])!.value,
      anneeAffectation: this.editForm.get(['anneeAffectation'])!.value,
      comptableMatiere: this.editForm.get(['comptableMatiere'])!.value,
      etablissement: this.editForm.get(['etablissement'])!.value,
      nomLycetech: this.editForm.get(['nomLycetech'])!.value,
      nomCFP: this.editForm.get(['nomCFP'])!.value,
    };
  }
}
