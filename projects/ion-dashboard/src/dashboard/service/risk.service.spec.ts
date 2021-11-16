import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RiskService } from './risk.service';
import { HttpClient } from '@angular/common/http';

describe('RiskService', () => {
  let service: RiskService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RiskService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search', (done) => {
    service.search('100', '200').subscribe((summary) => {
      expect(summary).toEqual({
        participantId: '300',
        collateralId: '200',
        settlementBalance: 500,
        netDepitCap: 100,
        collateralMonitor: 200,
        sppNetActivity: 0,
        netDirection: 'D',
        valueAtRisk: 100,
      });
      done();
    });
    const request = httpMock.expectOne(
      './api/cash-settlement/v1/net-cash-balance?participantAccountId=100&collGrpId=200'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe(
      './api/cash-settlement/v1/net-cash-balance?participantAccountId=100&collGrpId=200'
    );
    request.flush({
      settlement: {
        participantAccountId: '300',
        collateralId: '400',
        netBalance: 500,
        debitBalance: 100,
        netDirection: 'D',
      },
      risk: {
        collGrpId: '200',
        debitCapAmt: 100,
        collMntrAmt: 200,
        valueAtRisk: 100,
      },
    });

    httpMock.verify();
  });

  it('should search error', (done) => {
    service.search('100', '200').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No summary found');
        done();
      },
    });
    const request = httpMock.expectOne(
      './api/cash-settlement/v1/net-cash-balance?participantAccountId=100&collGrpId=200'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe(
      './api/cash-settlement/v1/net-cash-balance?participantAccountId=100&collGrpId=200'
    );
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });

  it('should search error 500 internal server error', (done) => {
    service.search('100', '200').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual({
          code: 500,
          description: 'Internal Server Error',
        });
        done();
      },
    });
    const request = httpMock.expectOne(
      './api/cash-settlement/v1/net-cash-balance?participantAccountId=100&collGrpId=200'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe(
      './api/cash-settlement/v1/net-cash-balance?participantAccountId=100&collGrpId=200'
    );
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
