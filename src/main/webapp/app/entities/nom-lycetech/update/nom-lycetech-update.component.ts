import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INomLycetech, NomLycetech } from '../nom-lycetech.model';
import { NomLycetechService } from '../service/nom-lycetech.service';

@Component({
  selector: 'jhi-nom-lycetech-update',
  templateUrl: './nom-lycetech-update.component.html',
})
export class NomLycetechUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomLycee: [],
  });

  constructor(protected nomLycetechService: NomLycetechService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nomLycetech }) => {
      this.updateForm(nomLycetech);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nomLycetech = this.createFromForm();
    if (nomLycetech.id !== undefined) {
      this.subscribeToSaveResponse(this.nomLycetechService.update(nomLycetech));
    } else {
      this.subscribeToSaveResponse(this.nomLycetechService.create(nomLycetech));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INomLycetech>>): void {
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

  protected updateForm(nomLycetech: INomLycetech): void {
    this.editForm.patchValue({
      id: nomLycetech.id,
      nomLycee: nomLycetech.nomLycee,
    });
  }

  protected createFromForm(): INomLycetech {
    return {
      ...new NomLycetech(),
      id: this.editForm.get(['id'])!.value,
      nomLycee: this.editForm.get(['nomLycee'])!.value,
    };
  }
}
