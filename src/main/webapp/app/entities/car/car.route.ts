import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'app/shared/model/car.model';
import { CarService } from './car.service';
import { CarComponent } from './car.component';
import { CarDetailComponent } from './car-detail.component';
import { CarUpdateComponent } from './car-update.component';
import { ICar } from 'app/shared/model/car.model';

@Injectable({ providedIn: 'root' })
export class CarResolve implements Resolve<ICar> {
  constructor(private service: CarService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICar> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((car: HttpResponse<Car>) => car.body));
    }
    return of(new Car());
  }
}

export const carRoute: Routes = [
  {
    path: '',
    component: CarComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechApp.car.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CarDetailComponent,
    resolve: {
      car: CarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechApp.car.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CarUpdateComponent,
    resolve: {
      car: CarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechApp.car.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CarUpdateComponent,
    resolve: {
      car: CarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'carTechApp.car.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
