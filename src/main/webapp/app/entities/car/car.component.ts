import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICar } from 'app/shared/model/car.model';
import { CarService } from './car.service';
import { CarDeleteDialogComponent } from './car-delete-dialog.component';

@Component({
  selector: 'jhi-car',
  templateUrl: './car.component.html'
})
export class CarComponent implements OnInit, OnDestroy {
  cars: ICar[];
  eventSubscriber: Subscription;

  constructor(protected carService: CarService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.carService.query().subscribe((res: HttpResponse<ICar[]>) => {
      this.cars = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCars();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICar) {
    return item.id;
  }

  registerChangeInCars() {
    this.eventSubscriber = this.eventManager.subscribe('carListModification', () => this.loadAll());
  }

  delete(car: ICar) {
    const modalRef = this.modalService.open(CarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.car = car;
  }
}
