import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../comptable-matiere.test-samples';

import { ComptableMatiereFormService } from './comptable-matiere-form.service';

describe('ComptableMatiere Form Service', () => {
  let service: ComptableMatiereFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComptableMatiereFormService);
  });

  describe('Service methods', () => {
    describe('createComptableMatiereFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createComptableMatiereFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomPrenom: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IComptableMatiere should create a new form with FormGroup', () => {
        const formGroup = service.createComptableMatiereFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomPrenom: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getComptableMatiere', () => {
      it('should return NewComptableMatiere for default ComptableMatiere initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createComptableMatiereFormGroup(sampleWithNewData);

        const comptableMatiere = service.getComptableMatiere(formGroup) as any;

        expect(comptableMatiere).toMatchObject(sampleWithNewData);
      });

      it('should return NewComptableMatiere for empty ComptableMatiere initial value', () => {
        const formGroup = service.createComptableMatiereFormGroup();

        const comptableMatiere = service.getComptableMatiere(formGroup) as any;

        expect(comptableMatiere).toMatchObject({});
      });

      it('should return IComptableMatiere', () => {
        const formGroup = service.createComptableMatiereFormGroup(sampleWithRequiredData);

        const comptableMatiere = service.getComptableMatiere(formGroup) as any;

        expect(comptableMatiere).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IComptableMatiere should not enable id FormControl', () => {
        const formGroup = service.createComptableMatiereFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewComptableMatiere should disable id FormControl', () => {
        const formGroup = service.createComptableMatiereFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
