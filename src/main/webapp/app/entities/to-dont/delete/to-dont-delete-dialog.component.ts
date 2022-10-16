import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IToDont } from '../to-dont.model';
import { ToDontService } from '../service/to-dont.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './to-dont-delete-dialog.component.html',
})
export class ToDontDeleteDialogComponent {
  toDont?: IToDont;

  constructor(protected toDontService: ToDontService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.toDontService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
