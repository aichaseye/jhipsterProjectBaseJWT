import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INomLycetech, getNomLycetechIdentifier } from '../nom-lycetech.model';

export type EntityResponseType = HttpResponse<INomLycetech>;
export type EntityArrayResponseType = HttpResponse<INomLycetech[]>;

@Injectable({ providedIn: 'root' })
export class NomLycetechService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nom-lyceteches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nomLycetech: INomLycetech): Observable<EntityResponseType> {
    return this.http.post<INomLycetech>(this.resourceUrl, nomLycetech, { observe: 'response' });
  }

  update(nomLycetech: INomLycetech): Observable<EntityResponseType> {
    return this.http.put<INomLycetech>(`${this.resourceUrl}/${getNomLycetechIdentifier(nomLycetech) as number}`, nomLycetech, {
      observe: 'response',
    });
  }

  partialUpdate(nomLycetech: INomLycetech): Observable<EntityResponseType> {
    return this.http.patch<INomLycetech>(`${this.resourceUrl}/${getNomLycetechIdentifier(nomLycetech) as number}`, nomLycetech, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INomLycetech>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INomLycetech[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNomLycetechToCollectionIfMissing(
    nomLycetechCollection: INomLycetech[],
    ...nomLycetechesToCheck: (INomLycetech | null | undefined)[]
  ): INomLycetech[] {
    const nomLyceteches: INomLycetech[] = nomLycetechesToCheck.filter(isPresent);
    if (nomLyceteches.length > 0) {
      const nomLycetechCollectionIdentifiers = nomLycetechCollection.map(nomLycetechItem => getNomLycetechIdentifier(nomLycetechItem)!);
      const nomLycetechesToAdd = nomLyceteches.filter(nomLycetechItem => {
        const nomLycetechIdentifier = getNomLycetechIdentifier(nomLycetechItem);
        if (nomLycetechIdentifier == null || nomLycetechCollectionIdentifiers.includes(nomLycetechIdentifier)) {
          return false;
        }
        nomLycetechCollectionIdentifiers.push(nomLycetechIdentifier);
        return true;
      });
      return [...nomLycetechesToAdd, ...nomLycetechCollection];
    }
    return nomLycetechCollection;
  }
}
