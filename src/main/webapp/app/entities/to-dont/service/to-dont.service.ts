import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IToDont, NewToDont } from '../to-dont.model';

export type PartialUpdateToDont = Partial<IToDont> & Pick<IToDont, 'id'>;

export type EntityResponseType = HttpResponse<IToDont>;
export type EntityArrayResponseType = HttpResponse<IToDont[]>;

@Injectable({ providedIn: 'root' })
export class ToDontService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/to-donts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(toDont: NewToDont): Observable<EntityResponseType> {
    return this.http.post<IToDont>(this.resourceUrl, toDont, { observe: 'response' });
  }

  update(toDont: IToDont): Observable<EntityResponseType> {
    return this.http.put<IToDont>(`${this.resourceUrl}/${this.getToDontIdentifier(toDont)}`, toDont, { observe: 'response' });
  }

  partialUpdate(toDont: PartialUpdateToDont): Observable<EntityResponseType> {
    return this.http.patch<IToDont>(`${this.resourceUrl}/${this.getToDontIdentifier(toDont)}`, toDont, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IToDont>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IToDont[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getToDontIdentifier(toDont: Pick<IToDont, 'id'>): number {
    return toDont.id;
  }

  compareToDont(o1: Pick<IToDont, 'id'> | null, o2: Pick<IToDont, 'id'> | null): boolean {
    return o1 && o2 ? this.getToDontIdentifier(o1) === this.getToDontIdentifier(o2) : o1 === o2;
  }

  addToDontToCollectionIfMissing<Type extends Pick<IToDont, 'id'>>(
    toDontCollection: Type[],
    ...toDontsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const toDonts: Type[] = toDontsToCheck.filter(isPresent);
    if (toDonts.length > 0) {
      const toDontCollectionIdentifiers = toDontCollection.map(toDontItem => this.getToDontIdentifier(toDontItem)!);
      const toDontsToAdd = toDonts.filter(toDontItem => {
        const toDontIdentifier = this.getToDontIdentifier(toDontItem);
        if (toDontCollectionIdentifiers.includes(toDontIdentifier)) {
          return false;
        }
        toDontCollectionIdentifiers.push(toDontIdentifier);
        return true;
      });
      return [...toDontsToAdd, ...toDontCollection];
    }
    return toDontCollection;
  }
}
