import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ToDontComponent } from './list/to-dont.component';
import { ToDontDetailComponent } from './detail/to-dont-detail.component';
import { ToDontUpdateComponent } from './update/to-dont-update.component';
import { ToDontDeleteDialogComponent } from './delete/to-dont-delete-dialog.component';
import { ToDontRoutingModule } from './route/to-dont-routing.module';

@NgModule({
  imports: [SharedModule, ToDontRoutingModule],
  declarations: [ToDontComponent, ToDontDetailComponent, ToDontUpdateComponent, ToDontDeleteDialogComponent],
})
export class ToDontModule {}
