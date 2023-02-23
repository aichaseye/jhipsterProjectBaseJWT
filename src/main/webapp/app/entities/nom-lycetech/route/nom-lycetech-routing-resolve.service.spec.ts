import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { INomLycetech, NomLycetech } from '../nom-lycetech.model';
import { NomLycetechService } from '../service/nom-lycetech.service';

import { NomLycetechRoutingResolveService } from './nom-lycetech-routing-resolve.service';

describe('NomLycetech routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NomLycetechRoutingResolveService;
  let service: NomLycetechService;
  let resultNomLycetech: INomLycetech | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(NomLycetechRoutingResolveService);
    service = TestBed.inject(NomLycetechService);
    resultNomLycetech = undefined;
  });

  describe('resolve', () => {
    it('should return INomLycetech returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNomLycetech = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNomLycetech).toEqual({ id: 123 });
    });

    it('should return new INomLycetech if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNomLycetech = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNomLycetech).toEqual(new NomLycetech());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NomLycetech })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNomLycetech = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNomLycetech).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
