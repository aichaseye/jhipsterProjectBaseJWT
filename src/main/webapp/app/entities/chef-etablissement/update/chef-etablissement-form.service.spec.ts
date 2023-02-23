import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chef-etablissement.test-samples';

import { ChefEtablissementFormService } from './chef-etablissement-form.service';

describe('ChefEtablissement Form Service', () => {
  let service: ChefEtablissementFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefEtablissementFormService);
  });

  describe('Service methods', () => {
    describe('createChefEtablissementFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChefEtablissementFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomPrenom: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IChefEtablissement should create a new form with FormGroup', () => {
        const formGroup = service.createChefEtablissementFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomPrenom: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getChefEtablissement', () => {
      it('should return NewChefEtablissement for default ChefEtablissement initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createChefEtablissementFormGroup(sampleWithNewData);

        const chefEtablissement = service.getChefEtablissement(formGroup) as any;

        expect(chefEtablissement).toMatchObject(sampleWithNewData);
      });

      it('should return NewChefEtablissement for empty ChefEtablissement initial value', () => {
        const formGroup = service.createChefEtablissementFormGroup();

        const chefEtablissement = service.getChefEtablissement(formGroup) as any;

        expect(chefEtablissement).toMatchObject({});
      });

      it('should return IChefEtablissement', () => {
        const formGroup = service.createChefEtablissementFormGroup(sampleWithRequiredData);

        const chefEtablissement = service.getChefEtablissement(formGroup) as any;

        expect(chefEtablissement).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChefEtablissement should not enable id FormControl', () => {
        const formGroup = service.createChefEtablissementFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChefEtablissement should disable id FormControl', () => {
        const formGroup = service.createChefEtablissementFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
