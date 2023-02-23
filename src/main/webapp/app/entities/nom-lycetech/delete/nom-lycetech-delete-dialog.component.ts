import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INomLycetech } from '../nom-lycetech.model';
import { NomLycetechService } from '../service/nom-lycetech.service';

@Component({
  templateUrl: './nom-lycetech-delete-dialog.component.html',
})
export class NomLycetechDeleteDialogComponent {
  nomLycetech?: INomLycetech;

  constructor(protected nomLycetechService: NomLycetechService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nomLycetechService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
