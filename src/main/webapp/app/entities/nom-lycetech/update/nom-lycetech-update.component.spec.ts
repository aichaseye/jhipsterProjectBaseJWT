import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NomLycetechService } from '../service/nom-lycetech.service';
import { INomLycetech, NomLycetech } from '../nom-lycetech.model';

import { NomLycetechUpdateComponent } from './nom-lycetech-update.component';

describe('NomLycetech Management Update Component', () => {
  let comp: NomLycetechUpdateComponent;
  let fixture: ComponentFixture<NomLycetechUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nomLycetechService: NomLycetechService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NomLycetechUpdateComponent],
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
      .overrideTemplate(NomLycetechUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NomLycetechUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nomLycetechService = TestBed.inject(NomLycetechService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nomLycetech: INomLycetech = { id: 456 };

      activatedRoute.data = of({ nomLycetech });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(nomLycetech));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NomLycetech>>();
      const nomLycetech = { id: 123 };
      jest.spyOn(nomLycetechService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nomLycetech });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nomLycetech }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(nomLycetechService.update).toHaveBeenCalledWith(nomLycetech);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NomLycetech>>();
      const nomLycetech = new NomLycetech();
      jest.spyOn(nomLycetechService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nomLycetech });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nomLycetech }));
      saveSubject.complete();

      // THEN
      expect(nomLycetechService.create).toHaveBeenCalledWith(nomLycetech);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NomLycetech>>();
      const nomLycetech = { id: 123 };
      jest.spyOn(nomLycetechService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nomLycetech });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nomLycetechService.update).toHaveBeenCalledWith(nomLycetech);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
