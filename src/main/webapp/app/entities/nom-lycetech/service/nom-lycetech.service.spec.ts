import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INomLycetech, NomLycetech } from '../nom-lycetech.model';

import { NomLycetechService } from './nom-lycetech.service';

describe('NomLycetech Service', () => {
  let service: NomLycetechService;
  let httpMock: HttpTestingController;
  let elemDefault: INomLycetech;
  let expectedResult: INomLycetech | INomLycetech[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NomLycetechService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nomLycee: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a NomLycetech', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NomLycetech()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NomLycetech', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomLycee: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NomLycetech', () => {
      const patchObject = Object.assign({}, new NomLycetech());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NomLycetech', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomLycee: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a NomLycetech', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNomLycetechToCollectionIfMissing', () => {
      it('should add a NomLycetech to an empty array', () => {
        const nomLycetech: INomLycetech = { id: 123 };
        expectedResult = service.addNomLycetechToCollectionIfMissing([], nomLycetech);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nomLycetech);
      });

      it('should not add a NomLycetech to an array that contains it', () => {
        const nomLycetech: INomLycetech = { id: 123 };
        const nomLycetechCollection: INomLycetech[] = [
          {
            ...nomLycetech,
          },
          { id: 456 },
        ];
        expectedResult = service.addNomLycetechToCollectionIfMissing(nomLycetechCollection, nomLycetech);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NomLycetech to an array that doesn't contain it", () => {
        const nomLycetech: INomLycetech = { id: 123 };
        const nomLycetechCollection: INomLycetech[] = [{ id: 456 }];
        expectedResult = service.addNomLycetechToCollectionIfMissing(nomLycetechCollection, nomLycetech);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nomLycetech);
      });

      it('should add only unique NomLycetech to an array', () => {
        const nomLycetechArray: INomLycetech[] = [{ id: 123 }, { id: 456 }, { id: 57594 }];
        const nomLycetechCollection: INomLycetech[] = [{ id: 123 }];
        expectedResult = service.addNomLycetechToCollectionIfMissing(nomLycetechCollection, ...nomLycetechArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nomLycetech: INomLycetech = { id: 123 };
        const nomLycetech2: INomLycetech = { id: 456 };
        expectedResult = service.addNomLycetechToCollectionIfMissing([], nomLycetech, nomLycetech2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nomLycetech);
        expect(expectedResult).toContain(nomLycetech2);
      });

      it('should accept null and undefined values', () => {
        const nomLycetech: INomLycetech = { id: 123 };
        expectedResult = service.addNomLycetechToCollectionIfMissing([], null, nomLycetech, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nomLycetech);
      });

      it('should return initial array if no NomLycetech is added', () => {
        const nomLycetechCollection: INomLycetech[] = [{ id: 123 }];
        expectedResult = service.addNomLycetechToCollectionIfMissing(nomLycetechCollection, undefined, null);
        expect(expectedResult).toEqual(nomLycetechCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
