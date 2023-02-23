import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NomCFPService } from '../service/nom-cfp.service';
import { INomCFP, NomCFP } from '../nom-cfp.model';

import { NomCFPUpdateComponent } from './nom-cfp-update.component';

describe('NomCFP Management Update Component', () => {
  let comp: NomCFPUpdateComponent;
  let fixture: ComponentFixture<NomCFPUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nomCFPService: NomCFPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NomCFPUpdateComponent],
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
      .overrideTemplate(NomCFPUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NomCFPUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nomCFPService = TestBed.inject(NomCFPService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nomCFP: INomCFP = { id: 456 };

      activatedRoute.data = of({ nomCFP });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(nomCFP));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NomCFP>>();
      const nomCFP = { id: 123 };
      jest.spyOn(nomCFPService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nomCFP });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nomCFP }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(nomCFPService.update).toHaveBeenCalledWith(nomCFP);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NomCFP>>();
      const nomCFP = new NomCFP();
      jest.spyOn(nomCFPService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nomCFP });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nomCFP }));
      saveSubject.complete();

      // THEN
      expect(nomCFPService.create).toHaveBeenCalledWith(nomCFP);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<NomCFP>>();
      const nomCFP = { id: 123 };
      jest.spyOn(nomCFPService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nomCFP });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nomCFPService.update).toHaveBeenCalledWith(nomCFP);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
