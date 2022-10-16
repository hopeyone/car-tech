import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ToDontComponent } from '../list/to-dont.component';
import { ToDontDetailComponent } from '../detail/to-dont-detail.component';
import { ToDontUpdateComponent } from '../update/to-dont-update.component';
import { ToDontRoutingResolveService } from './to-dont-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const toDontRoute: Routes = [
  {
    path: '',
    component: ToDontComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ToDontDetailComponent,
    resolve: {
      toDont: ToDontRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ToDontUpdateComponent,
    resolve: {
      toDont: ToDontRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ToDontUpdateComponent,
    resolve: {
      toDont: ToDontRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(toDontRoute)],
  exports: [RouterModule],
})
export class ToDontRoutingModule {}
