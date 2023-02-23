import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ApprenantService } from '../service/apprenant.service';
import { IApprenant, Apprenant } from '../apprenant.model';
import { IChefEtablissement } from 'app/entities/chef-etablissement/chef-etablissement.model';
import { ChefEtablissementService } from 'app/entities/chef-etablissement/service/chef-etablissement.service';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';

import { ApprenantUpdateComponent } from './apprenant-update.component';

describe('Apprenant Management Update Component', () => {
  let comp: ApprenantUpdateComponent;
  let fixture: ComponentFixture<ApprenantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let apprenantService: ApprenantService;
  let chefEtablissementService: ChefEtablissementService;
  let etablissementService: EtablissementService;
  let nomLycetechService: NomLycetechService;
  let nomCFPService: NomCFPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ApprenantUpdateComponent],
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
      .overrideTemplate(ApprenantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApprenantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apprenantService = TestBed.inject(ApprenantService);
    chefEtablissementService = TestBed.inject(ChefEtablissementService);
    etablissementService = TestBed.inject(EtablissementService);
    nomLycetechService = TestBed.inject(NomLycetechService);
    nomCFPService = TestBed.inject(NomCFPService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ChefEtablissement query and add missing value', () => {
      const apprenant: IApprenant = { id: 456 };
      const chefEtablissement: IChefEtablissement = { id: 50415 };
      apprenant.chefEtablissement = chefEtablissement;

      const chefEtablissementCollection: IChefEtablissement[] = [{ id: 22173 }];
      jest.spyOn(chefEtablissementService, 'query').mockReturnValue(of(new HttpResponse({ body: chefEtablissementCollection })));
      const additionalChefEtablissements = [chefEtablissement];
      const expectedCollection: IChefEtablissement[] = [...additionalChefEtablissements, ...chefEtablissementCollection];
      jest.spyOn(chefEtablissementService, 'addChefEtablissementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      expect(chefEtablissementService.query).toHaveBeenCalled();
      expect(chefEtablissementService.addChefEtablissementToCollectionIfMissing).toHaveBeenCalledWith(
        chefEtablissementCollection,
        ...additionalChefEtablissements
      );
      expect(comp.chefEtablissementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Etablissement query and add missing value', () => {
      const apprenant: IApprenant = { id: 456 };
      const etablissement: IEtablissement = { id: 92984 };
      apprenant.etablissement = etablissement;

      const etablissementCollection: IEtablissement[] = [{ id: 4021 }];
      jest.spyOn(etablissementService, 'query').mockReturnValue(of(new HttpResponse({ body: etablissementCollection })));
      const additionalEtablissements = [etablissement];
      const expectedCollection: IEtablissement[] = [...additionalEtablissements, ...etablissementCollection];
      jest.spyOn(etablissementService, 'addEtablissementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      expect(etablissementService.query).toHaveBeenCalled();
      expect(etablissementService.addEtablissementToCollectionIfMissing).toHaveBeenCalledWith(
        etablissementCollection,
        ...additionalEtablissements
      );
      expect(comp.etablissementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomLycetech query and add missing value', () => {
      const apprenant: IApprenant = { id: 456 };
      const nomLycetech: INomLycetech = { id: 41021 };
      apprenant.nomLycetech = nomLycetech;

      const nomLycetechCollection: INomLycetech[] = [{ id: 82684 }];
      jest.spyOn(nomLycetechService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLycetechCollection })));
      const additionalNomLyceteches = [nomLycetech];
      const expectedCollection: INomLycetech[] = [...additionalNomLyceteches, ...nomLycetechCollection];
      jest.spyOn(nomLycetechService, 'addNomLycetechToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      expect(nomLycetechService.query).toHaveBeenCalled();
      expect(nomLycetechService.addNomLycetechToCollectionIfMissing).toHaveBeenCalledWith(
        nomLycetechCollection,
        ...additionalNomLyceteches
      );
      expect(comp.nomLycetechesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomCFP query and add missing value', () => {
      const apprenant: IApprenant = { id: 456 };
      const nomCFP: INomCFP = { id: 98088 };
      apprenant.nomCFP = nomCFP;

      const nomCFPCollection: INomCFP[] = [{ id: 43446 }];
      jest.spyOn(nomCFPService, 'query').mockReturnValue(of(new HttpResponse({ body: nomCFPCollection })));
      const additionalNomCFPS = [nomCFP];
      const expectedCollection: INomCFP[] = [...additionalNomCFPS, ...nomCFPCollection];
      jest.spyOn(nomCFPService, 'addNomCFPToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      expect(nomCFPService.query).toHaveBeenCalled();
      expect(nomCFPService.addNomCFPToCollectionIfMissing).toHaveBeenCalledWith(nomCFPCollection, ...additionalNomCFPS);
      expect(comp.nomCFPSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const apprenant: IApprenant = { id: 456 };
      const chefEtablissement: IChefEtablissement = { id: 65419 };
      apprenant.chefEtablissement = chefEtablissement;
      const etablissement: IEtablissement = { id: 36316 };
      apprenant.etablissement = etablissement;
      const nomLycetech: INomLycetech = { id: 33468 };
      apprenant.nomLycetech = nomLycetech;
      const nomCFP: INomCFP = { id: 482 };
      apprenant.nomCFP = nomCFP;

      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(apprenant));
      expect(comp.chefEtablissementsSharedCollection).toContain(chefEtablissement);
      expect(comp.etablissementsSharedCollection).toContain(etablissement);
      expect(comp.nomLycetechesSharedCollection).toContain(nomLycetech);
      expect(comp.nomCFPSSharedCollection).toContain(nomCFP);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Apprenant>>();
      const apprenant = { id: 123 };
      jest.spyOn(apprenantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: apprenant }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(apprenantService.update).toHaveBeenCalledWith(apprenant);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Apprenant>>();
      const apprenant = new Apprenant();
      jest.spyOn(apprenantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: apprenant }));
      saveSubject.complete();

      // THEN
      expect(apprenantService.create).toHaveBeenCalledWith(apprenant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Apprenant>>();
      const apprenant = { id: 123 };
      jest.spyOn(apprenantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apprenant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(apprenantService.update).toHaveBeenCalledWith(apprenant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackChefEtablissementById', () => {
      it('Should return tracked ChefEtablissement primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackChefEtablissementById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEtablissementById', () => {
      it('Should return tracked Etablissement primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtablissementById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackNomLycetechById', () => {
      it('Should return tracked NomLycetech primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackNomLycetechById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackNomCFPById', () => {
      it('Should return tracked NomCFP primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackNomCFPById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
