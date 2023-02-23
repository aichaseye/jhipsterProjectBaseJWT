import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DemandeService } from '../service/demande.service';
import { IDemande, Demande } from '../demande.model';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';

import { DemandeUpdateComponent } from './demande-update.component';

describe('Demande Management Update Component', () => {
  let comp: DemandeUpdateComponent;
  let fixture: ComponentFixture<DemandeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeService: DemandeService;
  let etablissementService: EtablissementService;
  let nomLycetechService: NomLycetechService;
  let nomCFPService: NomCFPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DemandeUpdateComponent],
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
      .overrideTemplate(DemandeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeService = TestBed.inject(DemandeService);
    etablissementService = TestBed.inject(EtablissementService);
    nomLycetechService = TestBed.inject(NomLycetechService);
    nomCFPService = TestBed.inject(NomCFPService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Etablissement query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const etablissement: IEtablissement = { id: 98001 };
      demande.etablissement = etablissement;

      const etablissementCollection: IEtablissement[] = [{ id: 2744 }];
      jest.spyOn(etablissementService, 'query').mockReturnValue(of(new HttpResponse({ body: etablissementCollection })));
      const additionalEtablissements = [etablissement];
      const expectedCollection: IEtablissement[] = [...additionalEtablissements, ...etablissementCollection];
      jest.spyOn(etablissementService, 'addEtablissementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(etablissementService.query).toHaveBeenCalled();
      expect(etablissementService.addEtablissementToCollectionIfMissing).toHaveBeenCalledWith(
        etablissementCollection,
        ...additionalEtablissements
      );
      expect(comp.etablissementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomLycetech query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const nomLycetech: INomLycetech = { id: 64587 };
      demande.nomLycetech = nomLycetech;

      const nomLycetechCollection: INomLycetech[] = [{ id: 99204 }];
      jest.spyOn(nomLycetechService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLycetechCollection })));
      const additionalNomLyceteches = [nomLycetech];
      const expectedCollection: INomLycetech[] = [...additionalNomLyceteches, ...nomLycetechCollection];
      jest.spyOn(nomLycetechService, 'addNomLycetechToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(nomLycetechService.query).toHaveBeenCalled();
      expect(nomLycetechService.addNomLycetechToCollectionIfMissing).toHaveBeenCalledWith(
        nomLycetechCollection,
        ...additionalNomLyceteches
      );
      expect(comp.nomLycetechesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomCFP query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const nomCFP: INomCFP = { id: 17603 };
      demande.nomCFP = nomCFP;

      const nomCFPCollection: INomCFP[] = [{ id: 33920 }];
      jest.spyOn(nomCFPService, 'query').mockReturnValue(of(new HttpResponse({ body: nomCFPCollection })));
      const additionalNomCFPS = [nomCFP];
      const expectedCollection: INomCFP[] = [...additionalNomCFPS, ...nomCFPCollection];
      jest.spyOn(nomCFPService, 'addNomCFPToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(nomCFPService.query).toHaveBeenCalled();
      expect(nomCFPService.addNomCFPToCollectionIfMissing).toHaveBeenCalledWith(nomCFPCollection, ...additionalNomCFPS);
      expect(comp.nomCFPSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const demande: IDemande = { id: 456 };
      const etablissement: IEtablissement = { id: 51377 };
      demande.etablissement = etablissement;
      const nomLycetech: INomLycetech = { id: 9140 };
      demande.nomLycetech = nomLycetech;
      const nomCFP: INomCFP = { id: 45252 };
      demande.nomCFP = nomCFP;

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(demande));
      expect(comp.etablissementsSharedCollection).toContain(etablissement);
      expect(comp.nomLycetechesSharedCollection).toContain(nomLycetech);
      expect(comp.nomCFPSSharedCollection).toContain(nomCFP);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Demande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demande }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeService.update).toHaveBeenCalledWith(demande);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Demande>>();
      const demande = new Demande();
      jest.spyOn(demandeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demande }));
      saveSubject.complete();

      // THEN
      expect(demandeService.create).toHaveBeenCalledWith(demande);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Demande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeService.update).toHaveBeenCalledWith(demande);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
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
