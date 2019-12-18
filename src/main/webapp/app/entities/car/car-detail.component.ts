import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';

import { ICar } from 'app/shared/model/car.model';
import { DocumentService } from '../document/document.service';
import { IDocument } from 'app/shared/model/document.model';

@Component({
  selector: 'jhi-car-detail',
  templateUrl: './car-detail.component.html'
})
export class CarDetailComponent implements OnInit {
  car: ICar;

  constructor(protected activatedRoute: ActivatedRoute,
				protected documentService: DocumentService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
    });
  }

  downloadDocument(document: IDocument) {
	this.documentService.download(document.id).subscribe(file => {
	  FileSaver.saveAs(file, document.title);
    });
}
  previousState() {
    window.history.back();
  }
}
