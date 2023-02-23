import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NomCFPComponent } from '../list/nom-cfp.component';
import { NomCFPDetailComponent } from '../detail/nom-cfp-detail.component';
import { NomCFPUpdateComponent } from '../update/nom-cfp-update.component';
import { NomCFPRoutingResolveService } from './nom-cfp-routing-resolve.service';

const nomCFPRoute: Routes = [
  {
    path: '',
    component: NomCFPComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NomCFPDetailComponent,
    resolve: {
      nomCFP: NomCFPRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NomCFPUpdateComponent,
    resolve: {
      nomCFP: NomCFPRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NomCFPUpdateComponent,
    resolve: {
      nomCFP: NomCFPRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nomCFPRoute)],
  exports: [RouterModule],
})
export class NomCFPRoutingModule {}
