import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NomLycetechComponent } from './list/nom-lycetech.component';
import { NomLycetechDetailComponent } from './detail/nom-lycetech-detail.component';
import { NomLycetechUpdateComponent } from './update/nom-lycetech-update.component';
import { NomLycetechDeleteDialogComponent } from './delete/nom-lycetech-delete-dialog.component';
import { NomLycetechRoutingModule } from './route/nom-lycetech-routing.module';

@NgModule({
  imports: [SharedModule, NomLycetechRoutingModule],
  declarations: [NomLycetechComponent, NomLycetechDetailComponent, NomLycetechUpdateComponent, NomLycetechDeleteDialogComponent],
  entryComponents: [NomLycetechDeleteDialogComponent],
})
export class NomLycetechModule {}
