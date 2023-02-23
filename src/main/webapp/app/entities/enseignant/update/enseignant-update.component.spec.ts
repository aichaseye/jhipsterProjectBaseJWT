import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EnseignantService } from '../service/enseignant.service';
import { IEnseignant, Enseignant } from '../enseignant.model';
import { IBFPA } from 'app/entities/bfpa/bfpa.model';
import { BFPAService } from 'app/entities/bfpa/service/bfpa.service';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';

import { EnseignantUpdateComponent } from './enseignant-update.component';

describe('Enseignant Management Update Component', () => {
  let comp: EnseignantUpdateComponent;
  let fixture: ComponentFixture<EnseignantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let enseignantService: EnseignantService;
  let bFPAService: BFPAService;
  let etablissementService: EtablissementService;
  let nomLycetechService: NomLycetechService;
  let nomCFPService: NomCFPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EnseignantUpdateComponent],
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
      .overrideTemplate(EnseignantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EnseignantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    enseignantService = TestBed.inject(EnseignantService);
    bFPAService = TestBed.inject(BFPAService);
    etablissementService = TestBed.inject(EtablissementService);
    nomLycetechService = TestBed.inject(NomLycetechService);
    nomCFPService = TestBed.inject(NomCFPService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call BFPA query and add missing value', () => {
      const enseignant: IEnseignant = { id: 456 };
      const bFPA: IBFPA = { id: 88227 };
      enseignant.bFPA = bFPA;

      const bFPACollection: IBFPA[] = [{ id: 42996 }];
      jest.spyOn(bFPAService, 'query').mockReturnValue(of(new HttpResponse({ body: bFPACollection })));
      const additionalBFPAS = [bFPA];
      const expectedCollection: IBFPA[] = [...additionalBFPAS, ...bFPACollection];
      jest.spyOn(bFPAService, 'addBFPAToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      expect(bFPAService.query).toHaveBeenCalled();
      expect(bFPAService.addBFPAToCollectionIfMissing).toHaveBeenCalledWith(bFPACollection, ...additionalBFPAS);
      expect(comp.bFPASSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Etablissement query and add missing value', () => {
      const enseignant: IEnseignant = { id: 456 };
      const etablissement: IEtablissement = { id: 40626 };
      enseignant.etablissement = etablissement;

      const etablissementCollection: IEtablissement[] = [{ id: 35989 }];
      jest.spyOn(etablissementService, 'query').mockReturnValue(of(new HttpResponse({ body: etablissementCollection })));
      const additionalEtablissements = [etablissement];
      const expectedCollection: IEtablissement[] = [...additionalEtablissements, ...etablissementCollection];
      jest.spyOn(etablissementService, 'addEtablissementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      expect(etablissementService.query).toHaveBeenCalled();
      expect(etablissementService.addEtablissementToCollectionIfMissing).toHaveBeenCalledWith(
        etablissementCollection,
        ...additionalEtablissements
      );
      expect(comp.etablissementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomLycetech query and add missing value', () => {
      const enseignant: IEnseignant = { id: 456 };
      const nomLycetech: INomLycetech = { id: 90177 };
      enseignant.nomLycetech = nomLycetech;

      const nomLycetechCollection: INomLycetech[] = [{ id: 58942 }];
      jest.spyOn(nomLycetechService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLycetechCollection })));
      const additionalNomLyceteches = [nomLycetech];
      const expectedCollection: INomLycetech[] = [...additionalNomLyceteches, ...nomLycetechCollection];
      jest.spyOn(nomLycetechService, 'addNomLycetechToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      expect(nomLycetechService.query).toHaveBeenCalled();
      expect(nomLycetechService.addNomLycetechToCollectionIfMissing).toHaveBeenCalledWith(
        nomLycetechCollection,
        ...additionalNomLyceteches
      );
      expect(comp.nomLycetechesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomCFP query and add missing value', () => {
      const enseignant: IEnseignant = { id: 456 };
      const nomCFP: INomCFP = { id: 34111 };
      enseignant.nomCFP = nomCFP;

      const nomCFPCollection: INomCFP[] = [{ id: 29648 }];
      jest.spyOn(nomCFPService, 'query').mockReturnValue(of(new HttpResponse({ body: nomCFPCollection })));
      const additionalNomCFPS = [nomCFP];
      const expectedCollection: INomCFP[] = [...additionalNomCFPS, ...nomCFPCollection];
      jest.spyOn(nomCFPService, 'addNomCFPToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      expect(nomCFPService.query).toHaveBeenCalled();
      expect(nomCFPService.addNomCFPToCollectionIfMissing).toHaveBeenCalledWith(nomCFPCollection, ...additionalNomCFPS);
      expect(comp.nomCFPSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const enseignant: IEnseignant = { id: 456 };
      const bFPA: IBFPA = { id: 99527 };
      enseignant.bFPA = bFPA;
      const etablissement: IEtablissement = { id: 99939 };
      enseignant.etablissement = etablissement;
      const nomLycetech: INomLycetech = { id: 79311 };
      enseignant.nomLycetech = nomLycetech;
      const nomCFP: INomCFP = { id: 67137 };
      enseignant.nomCFP = nomCFP;

      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(enseignant));
      expect(comp.bFPASSharedCollection).toContain(bFPA);
      expect(comp.etablissementsSharedCollection).toContain(etablissement);
      expect(comp.nomLycetechesSharedCollection).toContain(nomLycetech);
      expect(comp.nomCFPSSharedCollection).toContain(nomCFP);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Enseignant>>();
      const enseignant = { id: 123 };
      jest.spyOn(enseignantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: enseignant }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(enseignantService.update).toHaveBeenCalledWith(enseignant);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Enseignant>>();
      const enseignant = new Enseignant();
      jest.spyOn(enseignantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: enseignant }));
      saveSubject.complete();

      // THEN
      expect(enseignantService.create).toHaveBeenCalledWith(enseignant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Enseignant>>();
      const enseignant = { id: 123 };
      jest.spyOn(enseignantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ enseignant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(enseignantService.update).toHaveBeenCalledWith(enseignant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackBFPAById', () => {
      it('Should return tracked BFPA primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackBFPAById(0, entity);
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
