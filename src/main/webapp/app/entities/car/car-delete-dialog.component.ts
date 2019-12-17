import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICar } from 'app/shared/model/car.model';
import { CarService } from './car.service';

@Component({
  templateUrl: './car-delete-dialog.component.html'
})
export class CarDeleteDialogComponent {
  car: ICar;

  constructor(protected carService: CarService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.carService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'carListModification',
        content: 'Deleted an car'
      });
      this.activeModal.dismiss(true);
    });
  }
}
