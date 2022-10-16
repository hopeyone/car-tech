import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IToDont } from '../to-dont.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../to-dont.test-samples';

import { ToDontService } from './to-dont.service';

const requireRestSample: IToDont = {
  ...sampleWithRequiredData,
};

describe('ToDont Service', () => {
  let service: ToDontService;
  let httpMock: HttpTestingController;
  let expectedResult: IToDont | IToDont[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ToDontService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ToDont', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const toDont = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(toDont).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ToDont', () => {
      const toDont = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(toDont).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ToDont', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ToDont', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ToDont', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addToDontToCollectionIfMissing', () => {
      it('should add a ToDont to an empty array', () => {
        const toDont: IToDont = sampleWithRequiredData;
        expectedResult = service.addToDontToCollectionIfMissing([], toDont);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(toDont);
      });

      it('should not add a ToDont to an array that contains it', () => {
        const toDont: IToDont = sampleWithRequiredData;
        const toDontCollection: IToDont[] = [
          {
            ...toDont,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addToDontToCollectionIfMissing(toDontCollection, toDont);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ToDont to an array that doesn't contain it", () => {
        const toDont: IToDont = sampleWithRequiredData;
        const toDontCollection: IToDont[] = [sampleWithPartialData];
        expectedResult = service.addToDontToCollectionIfMissing(toDontCollection, toDont);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(toDont);
      });

      it('should add only unique ToDont to an array', () => {
        const toDontArray: IToDont[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const toDontCollection: IToDont[] = [sampleWithRequiredData];
        expectedResult = service.addToDontToCollectionIfMissing(toDontCollection, ...toDontArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const toDont: IToDont = sampleWithRequiredData;
        const toDont2: IToDont = sampleWithPartialData;
        expectedResult = service.addToDontToCollectionIfMissing([], toDont, toDont2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(toDont);
        expect(expectedResult).toContain(toDont2);
      });

      it('should accept null and undefined values', () => {
        const toDont: IToDont = sampleWithRequiredData;
        expectedResult = service.addToDontToCollectionIfMissing([], null, toDont, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(toDont);
      });

      it('should return initial array if no ToDont is added', () => {
        const toDontCollection: IToDont[] = [sampleWithRequiredData];
        expectedResult = service.addToDontToCollectionIfMissing(toDontCollection, undefined, null);
        expect(expectedResult).toEqual(toDontCollection);
      });
    });

    describe('compareToDont', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareToDont(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareToDont(entity1, entity2);
        const compareResult2 = service.compareToDont(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareToDont(entity1, entity2);
        const compareResult2 = service.compareToDont(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareToDont(entity1, entity2);
        const compareResult2 = service.compareToDont(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
