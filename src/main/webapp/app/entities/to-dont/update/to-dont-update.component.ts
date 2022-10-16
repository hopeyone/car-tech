import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ToDontFormService, ToDontFormGroup } from './to-dont-form.service';
import { IToDont } from '../to-dont.model';
import { ToDontService } from '../service/to-dont.service';
import { IGroup } from 'app/entities/group/group.model';
import { GroupService } from 'app/entities/group/service/group.service';

@Component({
  selector: 'jhi-to-dont-update',
  templateUrl: './to-dont-update.component.html',
})
export class ToDontUpdateComponent implements OnInit {
  isSaving = false;
  toDont: IToDont | null = null;

  groupsSharedCollection: IGroup[] = [];

  editForm: ToDontFormGroup = this.toDontFormService.createToDontFormGroup();

  constructor(
    protected toDontService: ToDontService,
    protected toDontFormService: ToDontFormService,
    protected groupService: GroupService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareGroup = (o1: IGroup | null, o2: IGroup | null): boolean => this.groupService.compareGroup(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ toDont }) => {
      this.toDont = toDont;
      if (toDont) {
        this.updateForm(toDont);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const toDont = this.toDontFormService.getToDont(this.editForm);
    if (toDont.id !== null) {
      this.subscribeToSaveResponse(this.toDontService.update(toDont));
    } else {
      this.subscribeToSaveResponse(this.toDontService.create(toDont));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IToDont>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(toDont: IToDont): void {
    this.toDont = toDont;
    this.toDontFormService.resetForm(this.editForm, toDont);

    this.groupsSharedCollection = this.groupService.addGroupToCollectionIfMissing<IGroup>(this.groupsSharedCollection, toDont.group);
  }

  protected loadRelationshipsOptions(): void {
    this.groupService
      .query()
      .pipe(map((res: HttpResponse<IGroup[]>) => res.body ?? []))
      .pipe(map((groups: IGroup[]) => this.groupService.addGroupToCollectionIfMissing<IGroup>(groups, this.toDont?.group)))
      .subscribe((groups: IGroup[]) => (this.groupsSharedCollection = groups));
  }
}
