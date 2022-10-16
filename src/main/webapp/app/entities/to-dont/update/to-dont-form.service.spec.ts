import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../to-dont.test-samples';

import { ToDontFormService } from './to-dont-form.service';

describe('ToDont Form Service', () => {
  let service: ToDontFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDontFormService);
  });

  describe('Service methods', () => {
    describe('createToDontFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createToDontFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            group: expect.any(Object),
          })
        );
      });

      it('passing IToDont should create a new form with FormGroup', () => {
        const formGroup = service.createToDontFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            group: expect.any(Object),
          })
        );
      });
    });

    describe('getToDont', () => {
      it('should return NewToDont for default ToDont initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createToDontFormGroup(sampleWithNewData);

        const toDont = service.getToDont(formGroup) as any;

        expect(toDont).toMatchObject(sampleWithNewData);
      });

      it('should return NewToDont for empty ToDont initial value', () => {
        const formGroup = service.createToDontFormGroup();

        const toDont = service.getToDont(formGroup) as any;

        expect(toDont).toMatchObject({});
      });

      it('should return IToDont', () => {
        const formGroup = service.createToDontFormGroup(sampleWithRequiredData);

        const toDont = service.getToDont(formGroup) as any;

        expect(toDont).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IToDont should not enable id FormControl', () => {
        const formGroup = service.createToDontFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewToDont should disable id FormControl', () => {
        const formGroup = service.createToDontFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
