import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INomCFP, NomCFP } from '../nom-cfp.model';
import { NomCFPService } from '../service/nom-cfp.service';

@Injectable({ providedIn: 'root' })
export class NomCFPRoutingResolveService implements Resolve<INomCFP> {
  constructor(protected service: NomCFPService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INomCFP> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nomCFP: HttpResponse<NomCFP>) => {
          if (nomCFP.body) {
            return of(nomCFP.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NomCFP());
  }
}
