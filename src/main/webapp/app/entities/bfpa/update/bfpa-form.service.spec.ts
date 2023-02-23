import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../bfpa.test-samples';

import { BFPAFormService } from './bfpa-form.service';

describe('BFPA Form Service', () => {
  let service: BFPAFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BFPAFormService);
  });

  describe('Service methods', () => {
    describe('createBFPAFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBFPAFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomPrenom: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IBFPA should create a new form with FormGroup', () => {
        const formGroup = service.createBFPAFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomPrenom: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getBFPA', () => {
      it('should return NewBFPA for default BFPA initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBFPAFormGroup(sampleWithNewData);

        const bFPA = service.getBFPA(formGroup) as any;

        expect(bFPA).toMatchObject(sampleWithNewData);
      });

      it('should return NewBFPA for empty BFPA initial value', () => {
        const formGroup = service.createBFPAFormGroup();

        const bFPA = service.getBFPA(formGroup) as any;

        expect(bFPA).toMatchObject({});
      });

      it('should return IBFPA', () => {
        const formGroup = service.createBFPAFormGroup(sampleWithRequiredData);

        const bFPA = service.getBFPA(formGroup) as any;

        expect(bFPA).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBFPA should not enable id FormControl', () => {
        const formGroup = service.createBFPAFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBFPA should disable id FormControl', () => {
        const formGroup = service.createBFPAFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
