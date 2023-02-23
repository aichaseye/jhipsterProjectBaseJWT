import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NomCFPComponent } from './list/nom-cfp.component';
import { NomCFPDetailComponent } from './detail/nom-cfp-detail.component';
import { NomCFPUpdateComponent } from './update/nom-cfp-update.component';
import { NomCFPDeleteDialogComponent } from './delete/nom-cfp-delete-dialog.component';
import { NomCFPRoutingModule } from './route/nom-cfp-routing.module';

@NgModule({
  imports: [SharedModule, NomCFPRoutingModule],
  declarations: [NomCFPComponent, NomCFPDetailComponent, NomCFPUpdateComponent, NomCFPDeleteDialogComponent],
  entryComponents: [NomCFPDeleteDialogComponent],
})
export class NomCFPModule {}
