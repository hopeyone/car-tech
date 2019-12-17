import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { DocumentDeleteDialogComponent } from './document-delete-dialog.component';

@Component({
  selector: 'jhi-document',
  templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
  documents: IDocument[];
  eventSubscriber: Subscription;

  constructor(protected documentService: DocumentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.documentService.query().subscribe((res: HttpResponse<IDocument[]>) => {
      this.documents = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDocuments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocument) {
    return item.id;
  }

  registerChangeInDocuments() {
    this.eventSubscriber = this.eventManager.subscribe('documentListModification', () => this.loadAll());
  }

  delete(document: IDocument) {
    const modalRef = this.modalService.open(DocumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.document = document;
  }
}
