import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ToDontFormService } from './to-dont-form.service';
import { ToDontService } from '../service/to-dont.service';
import { IToDont } from '../to-dont.model';
import { IGroup } from 'app/entities/group/group.model';
import { GroupService } from 'app/entities/group/service/group.service';

import { ToDontUpdateComponent } from './to-dont-update.component';

describe('ToDont Management Update Component', () => {
  let comp: ToDontUpdateComponent;
  let fixture: ComponentFixture<ToDontUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let toDontFormService: ToDontFormService;
  let toDontService: ToDontService;
  let groupService: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ToDontUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ToDontUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ToDontUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    toDontFormService = TestBed.inject(ToDontFormService);
    toDontService = TestBed.inject(ToDontService);
    groupService = TestBed.inject(GroupService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Group query and add missing value', () => {
      const toDont: IToDont = { id: 456 };
      const group: IGroup = { id: 26103 };
      toDont.group = group;

      const groupCollection: IGroup[] = [{ id: 23276 }];
      jest.spyOn(groupService, 'query').mockReturnValue(of(new HttpResponse({ body: groupCollection })));
      const additionalGroups = [group];
      const expectedCollection: IGroup[] = [...additionalGroups, ...groupCollection];
      jest.spyOn(groupService, 'addGroupToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ toDont });
      comp.ngOnInit();

      expect(groupService.query).toHaveBeenCalled();
      expect(groupService.addGroupToCollectionIfMissing).toHaveBeenCalledWith(
        groupCollection,
        ...additionalGroups.map(expect.objectContaining)
      );
      expect(comp.groupsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const toDont: IToDont = { id: 456 };
      const group: IGroup = { id: 14385 };
      toDont.group = group;

      activatedRoute.data = of({ toDont });
      comp.ngOnInit();

      expect(comp.groupsSharedCollection).toContain(group);
      expect(comp.toDont).toEqual(toDont);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IToDont>>();
      const toDont = { id: 123 };
      jest.spyOn(toDontFormService, 'getToDont').mockReturnValue(toDont);
      jest.spyOn(toDontService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ toDont });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: toDont }));
      saveSubject.complete();

      // THEN
      expect(toDontFormService.getToDont).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(toDontService.update).toHaveBeenCalledWith(expect.objectContaining(toDont));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IToDont>>();
      const toDont = { id: 123 };
      jest.spyOn(toDontFormService, 'getToDont').mockReturnValue({ id: null });
      jest.spyOn(toDontService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ toDont: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: toDont }));
      saveSubject.complete();

      // THEN
      expect(toDontFormService.getToDont).toHaveBeenCalled();
      expect(toDontService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IToDont>>();
      const toDont = { id: 123 };
      jest.spyOn(toDontService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ toDont });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(toDontService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGroup', () => {
      it('Should forward to groupService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(groupService, 'compareGroup');
        comp.compareGroup(entity, entity2);
        expect(groupService.compareGroup).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
