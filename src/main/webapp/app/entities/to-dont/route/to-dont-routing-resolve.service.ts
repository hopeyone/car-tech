import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IToDont } from '../to-dont.model';
import { ToDontService } from '../service/to-dont.service';

@Injectable({ providedIn: 'root' })
export class ToDontRoutingResolveService implements Resolve<IToDont | null> {
  constructor(protected service: ToDontService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IToDont | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((toDont: HttpResponse<IToDont>) => {
          if (toDont.body) {
            return of(toDont.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
