import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContent } from 'app/shared/model/content.model';
import { ContentService } from './content.service';

@Component({
  templateUrl: './content-delete-dialog.component.html'
})
export class ContentDeleteDialogComponent {
  content: IContent;

  constructor(protected contentService: ContentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'contentListModification',
        content: 'Deleted an content'
      });
      this.activeModal.dismiss(true);
    });
  }
}
