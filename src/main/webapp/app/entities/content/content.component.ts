import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContent } from 'app/shared/model/content.model';
import { ContentService } from './content.service';
import { ContentDeleteDialogComponent } from './content-delete-dialog.component';

@Component({
  selector: 'jhi-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit, OnDestroy {
  contents: IContent[];
  eventSubscriber: Subscription;

  constructor(
    protected contentService: ContentService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.contentService.query().subscribe((res: HttpResponse<IContent[]>) => {
      this.contents = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInContents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContent) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInContents() {
    this.eventSubscriber = this.eventManager.subscribe('contentListModification', () => this.loadAll());
  }

  delete(content: IContent) {
    const modalRef = this.modalService.open(ContentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.content = content;
  }
}
