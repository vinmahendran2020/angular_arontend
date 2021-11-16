import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CCAService } from './cca.service';
import { HttpClient } from '@angular/common/http';

describe('CCAService', () => {
  let service: CCAService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CCAService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search', (done) => {
    service.search('100', '2020-12-01', '2020-12-02').subscribe((summary) => {
      expect(summary).toEqual({
        participantId: '100',
        adjustments: [
          {
            ccaId: '1',
            settlementDate: '2020-12-01',
            debitCredit: 'Debit',
            netCCAAmount: 100,
            settlementStatus: 'Settled',
          },
          {
            ccaId: '1',
            settlementDate: '2020-12-01',
            debitCredit: 'Credit',
            netCCAAmount: 100,
            settlementStatus: 'Settled',
          },
        ],
      });
      done();
    });

    const request = httpMock.expectOne('./api/netting/v1/netted-ccas');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      startDate: '2020-12-01',
      endDate: '2020-12-02',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-ccas');
    request.flush([
      {
        ccaId: '1',
        ccaSettlementDate: '2020-12-01',
        ccaDirection: 'D',
        netCCAAmount: 100,
        ccaStatus: 'Settled',
      },
      {
        ccaId: '1',
        ccaSettlementDate: '2020-12-01',
        ccaDirection: 'C',
        netCCAAmount: 100,
        ccaStatus: 'Settled',
      },
    ]);

    httpMock.verify();
  });

  it('should search error simple', (done) => {
    service.search('100', '2020-12-01', '2020-12-02').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this Participant ID');
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-ccas');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      startDate: '2020-12-01',
      endDate: '2020-12-02',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-ccas');
    request.error('No information found for this Participant ID' as any);

    httpMock.verify();
  });

  it('should search error empty nested', (done) => {
    service.search('100', '2020-12-01', '2020-12-02').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this Participant ID');
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-ccas');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      startDate: '2020-12-01',
      endDate: '2020-12-02',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-ccas');
    request.error(
      new ErrorEvent('error', {
        error: {},
      })
    );

    httpMock.verify();
  });

  it('should search error nested', (done) => {
    service.search('100', '2020-12-01', '2020-12-02').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this Participant ID');
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-ccas');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      startDate: '2020-12-01',
      endDate: '2020-12-02',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-ccas');
    request.error(
      new ErrorEvent('error', {
        error: { description: 'No information found for this Participant ID' },
      })
    );

    httpMock.verify();
  });

  it('should search error 500 internal server error', (done) => {
    service.search('100', '2020-12-01', '2020-12-02').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual({
          code: 500,
          description: 'Internal Server Error',
        });
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-ccas');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '100',
      startDate: '2020-12-01',
      endDate: '2020-12-02',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-ccas');
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

  it('should transactions', (done) => {
    service.transactions('100').subscribe((transactions) => {
      expect(transactions).toEqual({
        ccaId: '100',
        cusip: '',
        debits: [
          {
            netObligationId: '1',
            cusip: '1',
            ticker: 'ticker',
            ccaAmount: 100,
            netBuySell: '100',
            netQuantity: 100,
            closePrice: 100,
            netTradeAmount: 100,
            netObligationStatus: 'Settled',
            direction: 'D',
          },
        ],
        credits: [
          {
            netObligationId: '1',
            cusip: '1',
            ticker: 'ticker',
            ccaAmount: 100,
            netBuySell: '100',
            netQuantity: 100,
            closePrice: 100,
            netTradeAmount: 100,
            netObligationStatus: 'Settled',
            direction: 'C',
          },
        ],
      });
      done();
    });

    const request = httpMock.expectOne('./api/netting/v1/netted-cca/100');
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe('./api/netting/v1/netted-cca/100');
    request.flush([
      {
        nettedObligationId: '1',
        cusip: '1',
        ticker: 'ticker',
        ccaAmount: 100,
        netBuyOrSell: '100',
        netQuantity: 100,
        closePrice: 100,
        netTradeAmount: 100,
        nettedObligationStatus: 'Settled',
        ccaDirection: 'D',
      },
      {
        nettedObligationId: '1',
        cusip: '1',
        ticker: 'ticker',
        ccaAmount: 100,
        netBuyOrSell: '100',
        netQuantity: 100,
        closePrice: 100,
        netTradeAmount: 100,
        nettedObligationStatus: 'Settled',
        ccaDirection: 'C',
      },
    ]);

    httpMock.verify();
  });

  it('should transactions error simple', (done) => {
    service.transactions('100').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-cca/100');
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe('./api/netting/v1/netted-cca/100');
    request.error('error happened' as any);

    httpMock.verify();
  });

  it('should transactions error nested', (done) => {
    service.transactions('100').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });

    const request = httpMock.expectOne('./api/netting/v1/netted-cca/100');
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe('./api/netting/v1/netted-cca/100');
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });
});
