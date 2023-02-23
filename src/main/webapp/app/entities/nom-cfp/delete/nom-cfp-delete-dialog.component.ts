import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INomCFP } from '../nom-cfp.model';
import { NomCFPService } from '../service/nom-cfp.service';

@Component({
  templateUrl: './nom-cfp-delete-dialog.component.html',
})
export class NomCFPDeleteDialogComponent {
  nomCFP?: INomCFP;

  constructor(protected nomCFPService: NomCFPService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nomCFPService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
