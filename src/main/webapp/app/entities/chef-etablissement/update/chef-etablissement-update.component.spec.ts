import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChefEtablissementService } from '../service/chef-etablissement.service';
import { IChefEtablissement, ChefEtablissement } from '../chef-etablissement.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { ChefEtablissementUpdateComponent } from './chef-etablissement-update.component';

describe('ChefEtablissement Management Update Component', () => {
  let comp: ChefEtablissementUpdateComponent;
  let fixture: ComponentFixture<ChefEtablissementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chefEtablissementService: ChefEtablissementService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChefEtablissementUpdateComponent],
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
      .overrideTemplate(ChefEtablissementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChefEtablissementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chefEtablissementService = TestBed.inject(ChefEtablissementService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const chefEtablissement: IChefEtablissement = { id: 456 };
      const user: IUser = { id: 48695 };
      chefEtablissement.user = user;

      const userCollection: IUser[] = [{ id: 64799 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chefEtablissement });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chefEtablissement: IChefEtablissement = { id: 456 };
      const user: IUser = { id: 25128 };
      chefEtablissement.user = user;

      activatedRoute.data = of({ chefEtablissement });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(chefEtablissement));
      expect(comp.usersSharedCollection).toContain(user);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChefEtablissement>>();
      const chefEtablissement = { id: 123 };
      jest.spyOn(chefEtablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chefEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chefEtablissement }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(chefEtablissementService.update).toHaveBeenCalledWith(chefEtablissement);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChefEtablissement>>();
      const chefEtablissement = new ChefEtablissement();
      jest.spyOn(chefEtablissementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chefEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chefEtablissement }));
      saveSubject.complete();

      // THEN
      expect(chefEtablissementService.create).toHaveBeenCalledWith(chefEtablissement);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChefEtablissement>>();
      const chefEtablissement = { id: 123 };
      jest.spyOn(chefEtablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chefEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chefEtablissementService.update).toHaveBeenCalledWith(chefEtablissement);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
