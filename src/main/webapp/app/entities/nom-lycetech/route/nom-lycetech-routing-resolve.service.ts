import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INomLycetech, NomLycetech } from '../nom-lycetech.model';
import { NomLycetechService } from '../service/nom-lycetech.service';

@Injectable({ providedIn: 'root' })
export class NomLycetechRoutingResolveService implements Resolve<INomLycetech> {
  constructor(protected service: NomLycetechService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INomLycetech> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nomLycetech: HttpResponse<NomLycetech>) => {
          if (nomLycetech.body) {
            return of(nomLycetech.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NomLycetech());
  }
}
