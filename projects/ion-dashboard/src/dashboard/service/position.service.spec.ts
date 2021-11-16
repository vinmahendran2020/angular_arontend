import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PositionService } from './position.service';
import { HttpClient } from '@angular/common/http';

describe('PositionService', () => {
  let service: PositionService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PositionService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search', (done) => {
    service.search('100', '300', '12/20/2020').subscribe((summary) => {
      expect(summary).toEqual({
        security: '1',
        ticker: '2',
        cusip: '300',
        netAdditions: 300,
        minimumAmount: 200,
        memoSegregation: 300,
        totalFreeExcess: 200,
        pledged: 3,
        totalPositions: 203,
      });
      done();
    });
    const request = httpMock.expectOne('./api/position/v1/balance');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      cusip: '300',
      date: '12/20/2020',
    });
    expect(request.request.url).toBe('./api/position/v1/balance');
    request.flush({
      securityName: '1',
      ticker: '2',
      cusip: '300',
      position: {
        naQty: 300,
        maQty: 200,
        msegQty: 300,
        pledgeQty: 3,
      },
    });

    httpMock.verify();
  });

  it('should search error nested', (done) => {
    service.search('100', '300', '12/20/2020').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this CUSIP');
        done();
      },
    });
    const request = httpMock.expectOne('./api/position/v1/balance');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      cusip: '300',
      date: '12/20/2020',
    });
    expect(request.request.url).toBe('./api/position/v1/balance');
    request.error(
      new ErrorEvent('error', {
        error: { description: 'No information found for this CUSIP' },
      })
    );

    httpMock.verify();
  });

  it('should search error simple', (done) => {
    service.search('100', '300', '12/20/2020').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this CUSIP');
        done();
      },
    });
    const request = httpMock.expectOne('./api/position/v1/balance');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      cusip: '300',
      date: '12/20/2020',
    });
    expect(request.request.url).toBe('./api/position/v1/balance');
    request.error('No information found for this CUSIP' as any);

    httpMock.verify();
  });

  it('should search error 500 internal server error', (done) => {
    service.search('100', '300', '12/20/2020').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual({
          code: 500,
          description: 'Internal Server Error',
        });
        done();
      },
    });
    const request = httpMock.expectOne('./api/position/v1/balance');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      cusip: '300',
      date: '12/20/2020',
    });
    expect(request.request.url).toBe('./api/position/v1/balance');
    request.error(
      new ErrorEvent('error', {
        error: {
          code: 500,
          description: 'Internal Server Error',
        },
      })
    );

    httpMock.verify();
  });
});
