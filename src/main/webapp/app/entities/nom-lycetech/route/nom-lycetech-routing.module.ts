import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NomLycetechComponent } from '../list/nom-lycetech.component';
import { NomLycetechDetailComponent } from '../detail/nom-lycetech-detail.component';
import { NomLycetechUpdateComponent } from '../update/nom-lycetech-update.component';
import { NomLycetechRoutingResolveService } from './nom-lycetech-routing-resolve.service';

const nomLycetechRoute: Routes = [
  {
    path: '',
    component: NomLycetechComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NomLycetechDetailComponent,
    resolve: {
      nomLycetech: NomLycetechRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NomLycetechUpdateComponent,
    resolve: {
      nomLycetech: NomLycetechRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NomLycetechUpdateComponent,
    resolve: {
      nomLycetech: NomLycetechRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nomLycetechRoute)],
  exports: [RouterModule],
})
export class NomLycetechRoutingModule {}
