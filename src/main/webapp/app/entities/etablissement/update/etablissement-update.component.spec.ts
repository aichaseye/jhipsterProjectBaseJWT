import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EtablissementService } from '../service/etablissement.service';
import { IEtablissement, Etablissement } from '../etablissement.model';
import { IBFPA } from 'app/entities/bfpa/bfpa.model';
import { BFPAService } from 'app/entities/bfpa/service/bfpa.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';

import { EtablissementUpdateComponent } from './etablissement-update.component';

describe('Etablissement Management Update Component', () => {
  let comp: EtablissementUpdateComponent;
  let fixture: ComponentFixture<EtablissementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let etablissementService: EtablissementService;
  let bFPAService: BFPAService;
  let nomCFPService: NomCFPService;
  let nomLycetechService: NomLycetechService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EtablissementUpdateComponent],
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
      .overrideTemplate(EtablissementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EtablissementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    etablissementService = TestBed.inject(EtablissementService);
    bFPAService = TestBed.inject(BFPAService);
    nomCFPService = TestBed.inject(NomCFPService);
    nomLycetechService = TestBed.inject(NomLycetechService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call BFPA query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const bFPA: IBFPA = { id: 63176 };
      etablissement.bFPA = bFPA;

      const bFPACollection: IBFPA[] = [{ id: 52514 }];
      jest.spyOn(bFPAService, 'query').mockReturnValue(of(new HttpResponse({ body: bFPACollection })));
      const additionalBFPAS = [bFPA];
      const expectedCollection: IBFPA[] = [...additionalBFPAS, ...bFPACollection];
      jest.spyOn(bFPAService, 'addBFPAToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(bFPAService.query).toHaveBeenCalled();
      expect(bFPAService.addBFPAToCollectionIfMissing).toHaveBeenCalledWith(bFPACollection, ...additionalBFPAS);
      expect(comp.bFPASSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomCFP query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const nomCFP: INomCFP = { id: 48990 };
      etablissement.nomCFP = nomCFP;

      const nomCFPCollection: INomCFP[] = [{ id: 53008 }];
      jest.spyOn(nomCFPService, 'query').mockReturnValue(of(new HttpResponse({ body: nomCFPCollection })));
      const additionalNomCFPS = [nomCFP];
      const expectedCollection: INomCFP[] = [...additionalNomCFPS, ...nomCFPCollection];
      jest.spyOn(nomCFPService, 'addNomCFPToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(nomCFPService.query).toHaveBeenCalled();
      expect(nomCFPService.addNomCFPToCollectionIfMissing).toHaveBeenCalledWith(nomCFPCollection, ...additionalNomCFPS);
      expect(comp.nomCFPSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomLycetech query and add missing value', () => {
      const etablissement: IEtablissement = { id: 456 };
      const nomLycetech: INomLycetech = { id: 79740 };
      etablissement.nomLycetech = nomLycetech;

      const nomLycetechCollection: INomLycetech[] = [{ id: 92448 }];
      jest.spyOn(nomLycetechService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLycetechCollection })));
      const additionalNomLyceteches = [nomLycetech];
      const expectedCollection: INomLycetech[] = [...additionalNomLyceteches, ...nomLycetechCollection];
      jest.spyOn(nomLycetechService, 'addNomLycetechToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(nomLycetechService.query).toHaveBeenCalled();
      expect(nomLycetechService.addNomLycetechToCollectionIfMissing).toHaveBeenCalledWith(
        nomLycetechCollection,
        ...additionalNomLyceteches
      );
      expect(comp.nomLycetechesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const etablissement: IEtablissement = { id: 456 };
      const bFPA: IBFPA = { id: 72622 };
      etablissement.bFPA = bFPA;
      const nomCFP: INomCFP = { id: 38407 };
      etablissement.nomCFP = nomCFP;
      const nomLycetech: INomLycetech = { id: 53412 };
      etablissement.nomLycetech = nomLycetech;

      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(etablissement));
      expect(comp.bFPASSharedCollection).toContain(bFPA);
      expect(comp.nomCFPSSharedCollection).toContain(nomCFP);
      expect(comp.nomLycetechesSharedCollection).toContain(nomLycetech);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etablissement>>();
      const etablissement = { id: 123 };
      jest.spyOn(etablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etablissement }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(etablissementService.update).toHaveBeenCalledWith(etablissement);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etablissement>>();
      const etablissement = new Etablissement();
      jest.spyOn(etablissementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etablissement }));
      saveSubject.complete();

      // THEN
      expect(etablissementService.create).toHaveBeenCalledWith(etablissement);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etablissement>>();
      const etablissement = { id: 123 };
      jest.spyOn(etablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(etablissementService.update).toHaveBeenCalledWith(etablissement);
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

    describe('trackNomCFPById', () => {
      it('Should return tracked NomCFP primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackNomCFPById(0, entity);
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
  });
});
