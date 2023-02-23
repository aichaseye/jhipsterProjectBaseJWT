import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nom-lycetech.test-samples';

import { NomLycetechFormService } from './nom-lycetech-form.service';

describe('NomLycetech Form Service', () => {
  let service: NomLycetechFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NomLycetechFormService);
  });

  describe('Service methods', () => {
    describe('createNomLycetechFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNomLycetechFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomLycee: expect.any(Object),
          })
        );
      });

      it('passing INomLycetech should create a new form with FormGroup', () => {
        const formGroup = service.createNomLycetechFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomLycee: expect.any(Object),
          })
        );
      });
    });

    describe('getNomLycetech', () => {
      it('should return NewNomLycetech for default NomLycetech initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNomLycetechFormGroup(sampleWithNewData);

        const nomLycetech = service.getNomLycetech(formGroup) as any;

        expect(nomLycetech).toMatchObject(sampleWithNewData);
      });

      it('should return NewNomLycetech for empty NomLycetech initial value', () => {
        const formGroup = service.createNomLycetechFormGroup();

        const nomLycetech = service.getNomLycetech(formGroup) as any;

        expect(nomLycetech).toMatchObject({});
      });

      it('should return INomLycetech', () => {
        const formGroup = service.createNomLycetechFormGroup(sampleWithRequiredData);

        const nomLycetech = service.getNomLycetech(formGroup) as any;

        expect(nomLycetech).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INomLycetech should not enable id FormControl', () => {
        const formGroup = service.createNomLycetechFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNomLycetech should disable id FormControl', () => {
        const formGroup = service.createNomLycetechFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
