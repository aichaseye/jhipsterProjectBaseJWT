import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INomCFP, NomCFP } from '../nom-cfp.model';

import { NomCFPService } from './nom-cfp.service';

describe('NomCFP Service', () => {
  let service: NomCFPService;
  let httpMock: HttpTestingController;
  let elemDefault: INomCFP;
  let expectedResult: INomCFP | INomCFP[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NomCFPService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nomCFP: 'AAAAAAA',
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

    it('should create a NomCFP', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NomCFP()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NomCFP', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomCFP: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NomCFP', () => {
      const patchObject = Object.assign(
        {
          nomCFP: 'BBBBBB',
        },
        new NomCFP()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NomCFP', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nomCFP: 'BBBBBB',
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

    it('should delete a NomCFP', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNomCFPToCollectionIfMissing', () => {
      it('should add a NomCFP to an empty array', () => {
        const nomCFP: INomCFP = { id: 123 };
        expectedResult = service.addNomCFPToCollectionIfMissing([], nomCFP);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nomCFP);
      });

      it('should not add a NomCFP to an array that contains it', () => {
        const nomCFP: INomCFP = { id: 123 };
        const nomCFPCollection: INomCFP[] = [
          {
            ...nomCFP,
          },
          { id: 456 },
        ];
        expectedResult = service.addNomCFPToCollectionIfMissing(nomCFPCollection, nomCFP);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NomCFP to an array that doesn't contain it", () => {
        const nomCFP: INomCFP = { id: 123 };
        const nomCFPCollection: INomCFP[] = [{ id: 456 }];
        expectedResult = service.addNomCFPToCollectionIfMissing(nomCFPCollection, nomCFP);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nomCFP);
      });

      it('should add only unique NomCFP to an array', () => {
        const nomCFPArray: INomCFP[] = [{ id: 123 }, { id: 456 }, { id: 16129 }];
        const nomCFPCollection: INomCFP[] = [{ id: 123 }];
        expectedResult = service.addNomCFPToCollectionIfMissing(nomCFPCollection, ...nomCFPArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nomCFP: INomCFP = { id: 123 };
        const nomCFP2: INomCFP = { id: 456 };
        expectedResult = service.addNomCFPToCollectionIfMissing([], nomCFP, nomCFP2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nomCFP);
        expect(expectedResult).toContain(nomCFP2);
      });

      it('should accept null and undefined values', () => {
        const nomCFP: INomCFP = { id: 123 };
        expectedResult = service.addNomCFPToCollectionIfMissing([], null, nomCFP, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nomCFP);
      });

      it('should return initial array if no NomCFP is added', () => {
        const nomCFPCollection: INomCFP[] = [{ id: 123 }];
        expectedResult = service.addNomCFPToCollectionIfMissing(nomCFPCollection, undefined, null);
        expect(expectedResult).toEqual(nomCFPCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
