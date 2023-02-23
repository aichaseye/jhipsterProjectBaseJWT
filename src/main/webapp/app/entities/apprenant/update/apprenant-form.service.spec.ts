import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../apprenant.test-samples';

import { ApprenantFormService } from './apprenant-form.service';

describe('Apprenant Form Service', () => {
  let service: ApprenantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprenantFormService);
  });

  describe('Service methods', () => {
    describe('createApprenantFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApprenantFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            matriculeApp: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            sexe: expect.any(Object),
            telephone: expect.any(Object),
            email: expect.any(Object),
            chefEtablissement: expect.any(Object),
            etablissement: expect.any(Object),
            nomLycetech: expect.any(Object),
            nomCFP: expect.any(Object),
          })
        );
      });

      it('passing IApprenant should create a new form with FormGroup', () => {
        const formGroup = service.createApprenantFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            matriculeApp: expect.any(Object),
            nom: expect.any(Object),
            prenom: expect.any(Object),
            sexe: expect.any(Object),
            telephone: expect.any(Object),
            email: expect.any(Object),
            chefEtablissement: expect.any(Object),
            etablissement: expect.any(Object),
            nomLycetech: expect.any(Object),
            nomCFP: expect.any(Object),
          })
        );
      });
    });

    describe('getApprenant', () => {
      it('should return NewApprenant for default Apprenant initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createApprenantFormGroup(sampleWithNewData);

        const apprenant = service.getApprenant(formGroup) as any;

        expect(apprenant).toMatchObject(sampleWithNewData);
      });

      it('should return NewApprenant for empty Apprenant initial value', () => {
        const formGroup = service.createApprenantFormGroup();

        const apprenant = service.getApprenant(formGroup) as any;

        expect(apprenant).toMatchObject({});
      });

      it('should return IApprenant', () => {
        const formGroup = service.createApprenantFormGroup(sampleWithRequiredData);

        const apprenant = service.getApprenant(formGroup) as any;

        expect(apprenant).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApprenant should not enable id FormControl', () => {
        const formGroup = service.createApprenantFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApprenant should disable id FormControl', () => {
        const formGroup = service.createApprenantFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
