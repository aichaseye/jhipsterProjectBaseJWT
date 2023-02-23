import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INomCFP, NomCFP } from '../nom-cfp.model';
import { NomCFPService } from '../service/nom-cfp.service';

@Component({
  selector: 'jhi-nom-cfp-update',
  templateUrl: './nom-cfp-update.component.html',
})
export class NomCFPUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomCFP: [],
  });

  constructor(protected nomCFPService: NomCFPService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nomCFP }) => {
      this.updateForm(nomCFP);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nomCFP = this.createFromForm();
    if (nomCFP.id !== undefined) {
      this.subscribeToSaveResponse(this.nomCFPService.update(nomCFP));
    } else {
      this.subscribeToSaveResponse(this.nomCFPService.create(nomCFP));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INomCFP>>): void {
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

  protected updateForm(nomCFP: INomCFP): void {
    this.editForm.patchValue({
      id: nomCFP.id,
      nomCFP: nomCFP.nomCFP,
    });
  }

  protected createFromForm(): INomCFP {
    return {
      ...new NomCFP(),
      id: this.editForm.get(['id'])!.value,
      nomCFP: this.editForm.get(['nomCFP'])!.value,
    };
  }
}
