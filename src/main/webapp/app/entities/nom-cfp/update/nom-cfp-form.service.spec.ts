import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nom-cfp.test-samples';

import { NomCFPFormService } from './nom-cfp-form.service';

describe('NomCFP Form Service', () => {
  let service: NomCFPFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomCFPFormService);
  });

  describe('Service methods', () => {
    describe('createNomCFPFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNomCFPFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomCFP: expect.any(Object),
          })
        );
      });

      it('passing INomCFP should create a new form with FormGroup', () => {
        const formGroup = service.createNomCFPFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomCFP: expect.any(Object),
          })
        );
      });
    });

    describe('getNomCFP', () => {
      it('should return NewNomCFP for default NomCFP initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNomCFPFormGroup(sampleWithNewData);

        const nomCFP = service.getNomCFP(formGroup) as any;

        expect(nomCFP).toMatchObject(sampleWithNewData);
      });

      it('should return NewNomCFP for empty NomCFP initial value', () => {
        const formGroup = service.createNomCFPFormGroup();

        const nomCFP = service.getNomCFP(formGroup) as any;

        expect(nomCFP).toMatchObject({});
      });

      it('should return INomCFP', () => {
        const formGroup = service.createNomCFPFormGroup(sampleWithRequiredData);

        const nomCFP = service.getNomCFP(formGroup) as any;

        expect(nomCFP).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INomCFP should not enable id FormControl', () => {
        const formGroup = service.createNomCFPFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNomCFP should disable id FormControl', () => {
        const formGroup = service.createNomCFPFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
