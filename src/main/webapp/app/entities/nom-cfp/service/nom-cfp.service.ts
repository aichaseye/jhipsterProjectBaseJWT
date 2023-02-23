import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INomCFP, getNomCFPIdentifier } from '../nom-cfp.model';

export type EntityResponseType = HttpResponse<INomCFP>;
export type EntityArrayResponseType = HttpResponse<INomCFP[]>;

@Injectable({ providedIn: 'root' })
export class NomCFPService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nom-cfps');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nomCFP: INomCFP): Observable<EntityResponseType> {
    return this.http.post<INomCFP>(this.resourceUrl, nomCFP, { observe: 'response' });
  }

  update(nomCFP: INomCFP): Observable<EntityResponseType> {
    return this.http.put<INomCFP>(`${this.resourceUrl}/${getNomCFPIdentifier(nomCFP) as number}`, nomCFP, { observe: 'response' });
  }

  partialUpdate(nomCFP: INomCFP): Observable<EntityResponseType> {
    return this.http.patch<INomCFP>(`${this.resourceUrl}/${getNomCFPIdentifier(nomCFP) as number}`, nomCFP, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INomCFP>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INomCFP[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNomCFPToCollectionIfMissing(nomCFPCollection: INomCFP[], ...nomCFPSToCheck: (INomCFP | null | undefined)[]): INomCFP[] {
    const nomCFPS: INomCFP[] = nomCFPSToCheck.filter(isPresent);
    if (nomCFPS.length > 0) {
      const nomCFPCollectionIdentifiers = nomCFPCollection.map(nomCFPItem => getNomCFPIdentifier(nomCFPItem)!);
      const nomCFPSToAdd = nomCFPS.filter(nomCFPItem => {
        const nomCFPIdentifier = getNomCFPIdentifier(nomCFPItem);
        if (nomCFPIdentifier == null || nomCFPCollectionIdentifiers.includes(nomCFPIdentifier)) {
          return false;
        }
        nomCFPCollectionIdentifiers.push(nomCFPIdentifier);
        return true;
      });
      return [...nomCFPSToAdd, ...nomCFPCollection];
    }
    return nomCFPCollection;
  }
}
