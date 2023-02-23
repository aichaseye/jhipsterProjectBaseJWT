import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { MatiereService } from '../service/matiere.service';
import { IMatiere, Matiere } from '../matiere.model';
import { IComptableMatiere } from 'app/entities/comptable-matiere/comptable-matiere.model';
import { ComptableMatiereService } from 'app/entities/comptable-matiere/service/comptable-matiere.service';
import { IEtablissement } from 'app/entities/etablissement/etablissement.model';
import { EtablissementService } from 'app/entities/etablissement/service/etablissement.service';
import { INomLycetech } from 'app/entities/nom-lycetech/nom-lycetech.model';
import { NomLycetechService } from 'app/entities/nom-lycetech/service/nom-lycetech.service';
import { INomCFP } from 'app/entities/nom-cfp/nom-cfp.model';
import { NomCFPService } from 'app/entities/nom-cfp/service/nom-cfp.service';

import { MatiereUpdateComponent } from './matiere-update.component';

describe('Matiere Management Update Component', () => {
  let comp: MatiereUpdateComponent;
  let fixture: ComponentFixture<MatiereUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let matiereService: MatiereService;
  let comptableMatiereService: ComptableMatiereService;
  let etablissementService: EtablissementService;
  let nomLycetechService: NomLycetechService;
  let nomCFPService: NomCFPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [MatiereUpdateComponent],
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
      .overrideTemplate(MatiereUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MatiereUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    matiereService = TestBed.inject(MatiereService);
    comptableMatiereService = TestBed.inject(ComptableMatiereService);
    etablissementService = TestBed.inject(EtablissementService);
    nomLycetechService = TestBed.inject(NomLycetechService);
    nomCFPService = TestBed.inject(NomCFPService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ComptableMatiere query and add missing value', () => {
      const matiere: IMatiere = { id: 456 };
      const comptableMatiere: IComptableMatiere = { id: 13723 };
      matiere.comptableMatiere = comptableMatiere;

      const comptableMatiereCollection: IComptableMatiere[] = [{ id: 65197 }];
      jest.spyOn(comptableMatiereService, 'query').mockReturnValue(of(new HttpResponse({ body: comptableMatiereCollection })));
      const additionalComptableMatieres = [comptableMatiere];
      const expectedCollection: IComptableMatiere[] = [...additionalComptableMatieres, ...comptableMatiereCollection];
      jest.spyOn(comptableMatiereService, 'addComptableMatiereToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      expect(comptableMatiereService.query).toHaveBeenCalled();
      expect(comptableMatiereService.addComptableMatiereToCollectionIfMissing).toHaveBeenCalledWith(
        comptableMatiereCollection,
        ...additionalComptableMatieres
      );
      expect(comp.comptableMatieresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Etablissement query and add missing value', () => {
      const matiere: IMatiere = { id: 456 };
      const etablissement: IEtablissement = { id: 49619 };
      matiere.etablissement = etablissement;

      const etablissementCollection: IEtablissement[] = [{ id: 84473 }];
      jest.spyOn(etablissementService, 'query').mockReturnValue(of(new HttpResponse({ body: etablissementCollection })));
      const additionalEtablissements = [etablissement];
      const expectedCollection: IEtablissement[] = [...additionalEtablissements, ...etablissementCollection];
      jest.spyOn(etablissementService, 'addEtablissementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      expect(etablissementService.query).toHaveBeenCalled();
      expect(etablissementService.addEtablissementToCollectionIfMissing).toHaveBeenCalledWith(
        etablissementCollection,
        ...additionalEtablissements
      );
      expect(comp.etablissementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomLycetech query and add missing value', () => {
      const matiere: IMatiere = { id: 456 };
      const nomLycetech: INomLycetech = { id: 89518 };
      matiere.nomLycetech = nomLycetech;

      const nomLycetechCollection: INomLycetech[] = [{ id: 97877 }];
      jest.spyOn(nomLycetechService, 'query').mockReturnValue(of(new HttpResponse({ body: nomLycetechCollection })));
      const additionalNomLyceteches = [nomLycetech];
      const expectedCollection: INomLycetech[] = [...additionalNomLyceteches, ...nomLycetechCollection];
      jest.spyOn(nomLycetechService, 'addNomLycetechToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      expect(nomLycetechService.query).toHaveBeenCalled();
      expect(nomLycetechService.addNomLycetechToCollectionIfMissing).toHaveBeenCalledWith(
        nomLycetechCollection,
        ...additionalNomLyceteches
      );
      expect(comp.nomLycetechesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call NomCFP query and add missing value', () => {
      const matiere: IMatiere = { id: 456 };
      const nomCFP: INomCFP = { id: 18885 };
      matiere.nomCFP = nomCFP;

      const nomCFPCollection: INomCFP[] = [{ id: 35765 }];
      jest.spyOn(nomCFPService, 'query').mockReturnValue(of(new HttpResponse({ body: nomCFPCollection })));
      const additionalNomCFPS = [nomCFP];
      const expectedCollection: INomCFP[] = [...additionalNomCFPS, ...nomCFPCollection];
      jest.spyOn(nomCFPService, 'addNomCFPToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      expect(nomCFPService.query).toHaveBeenCalled();
      expect(nomCFPService.addNomCFPToCollectionIfMissing).toHaveBeenCalledWith(nomCFPCollection, ...additionalNomCFPS);
      expect(comp.nomCFPSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const matiere: IMatiere = { id: 456 };
      const comptableMatiere: IComptableMatiere = { id: 96555 };
      matiere.comptableMatiere = comptableMatiere;
      const etablissement: IEtablissement = { id: 45033 };
      matiere.etablissement = etablissement;
      const nomLycetech: INomLycetech = { id: 19603 };
      matiere.nomLycetech = nomLycetech;
      const nomCFP: INomCFP = { id: 68177 };
      matiere.nomCFP = nomCFP;

      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(matiere));
      expect(comp.comptableMatieresSharedCollection).toContain(comptableMatiere);
      expect(comp.etablissementsSharedCollection).toContain(etablissement);
      expect(comp.nomLycetechesSharedCollection).toContain(nomLycetech);
      expect(comp.nomCFPSSharedCollection).toContain(nomCFP);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Matiere>>();
      const matiere = { id: 123 };
      jest.spyOn(matiereService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: matiere }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(matiereService.update).toHaveBeenCalledWith(matiere);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Matiere>>();
      const matiere = new Matiere();
      jest.spyOn(matiereService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: matiere }));
      saveSubject.complete();

      // THEN
      expect(matiereService.create).toHaveBeenCalledWith(matiere);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Matiere>>();
      const matiere = { id: 123 };
      jest.spyOn(matiereService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ matiere });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(matiereService.update).toHaveBeenCalledWith(matiere);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackComptableMatiereById', () => {
      it('Should return tracked ComptableMatiere primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackComptableMatiereById(0, entity);
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
