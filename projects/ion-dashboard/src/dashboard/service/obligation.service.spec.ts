import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ObligationService } from './obligation.service';
import { HttpClient } from '@angular/common/http';

describe('ObligationService', () => {
  let service: ObligationService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ObligationService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search', (done) => {
    service.search('00005208').subscribe((summary) => {
      expect(summary).toEqual({
        cusip: '',
        sortBy: undefined,
        longs: [
          {
            netObligationId: '227669f7-fed8-4081-a2b6-7e2d181e867a',
            securityName: 'Apple Inc Com',
            cusip: '037833100',
            ticker: 'AAPL',
            isin: null,
            netQuantity: 14600,
            netTradeAmount: 67420127,
            settlementValue: 157096,
            settlementDate: '2020-11-27',
            closePrice: 10.76,
            settlementStatus: 'OPEN',
          },
          {
            netObligationId: '6181a9a1-c249-40e7-b931-329cd98ab22b',
            securityName: 'Google Inc Com',
            cusip: '02079K107',
            ticker: 'GOOG',
            isin: null,
            netQuantity: 11200,
            netTradeAmount: 47231152,
            settlementValue: 1128512,
            settlementDate: '2020-12-01',
            closePrice: 100.76,
            settlementStatus: 'OPEN',
          },
        ],
        shorts: [
          {
            netObligationId: '7d7cc4af-7b8a-4fd3-b032-14158b2d9f2a',
            securityName: 'Apple Inc Com',
            cusip: '037833100',
            ticker: 'AAPL',
            isin: null,
            netQuantity: 600,
            netTradeAmount: 2834874,
            settlementValue: 6456,
            settlementDate: '2020-11-25',
            closePrice: 10.76,
            settlementStatus: 'OPEN',
          },
        ],
        closed: [
          {
            netObligationId: '7d7cc4af-7b8a-4fd3-1234-14158b2d9f2a',
            securityName: 'Apple Inc Com',
            cusip: '037833100',
            ticker: 'AAPL',
            isin: null,
            netQuantity: 600,
            netTradeAmount: 2834874,
            settlementValue: 6456,
            settlementDate: '2020-11-25',
            closePrice: 10.76,
            settlementStatus: 'CLOSED',
          },
        ],
      });
      done();
    });

    const request = httpMock.expectOne('./api/netting/v1/netted-obligations');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '00005208',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-obligations');
    request.flush([
      {
        netObligationId: '227669f7-fed8-4081-a2b6-7e2d181e867a',
        securityName: 'Apple Inc Com',
        cusip: '037833100',
        ticker: 'AAPL',
        isin: null,
        participantAccountId: '17391393',
        netQuantity: 14600,
        netTradeAmount: 67420127,
        settlementValue: 157096.0,
        settlementDate: '2020-11-27',
        closePrice: 10.76,
        tradeDirectionInd: 'R',
        settlementStatus: 'OPEN',
      },
      {
        netObligationId: '6181a9a1-c249-40e7-b931-329cd98ab22b',
        securityName: 'Google Inc Com',
        cusip: '02079K107',
        ticker: 'GOOG',
        isin: null,
        participantAccountId: '17391393',
        netQuantity: 11200,
        netTradeAmount: 47231152,
        settlementValue: 1128512.0,
        settlementDate: '2020-12-01',
        closePrice: 100.76,
        tradeDirectionInd: 'R',
        settlementStatus: 'OPEN',
      },
      {
        netObligationId: '7d7cc4af-7b8a-4fd3-b032-14158b2d9f2a',
        securityName: 'Apple Inc Com',
        cusip: '037833100',
        ticker: 'AAPL',
        isin: null,
        participantAccountId: '17391393',
        netQuantity: 600,
        netTradeAmount: 2834874.0,
        settlementValue: 6456.0,
        settlementDate: '2020-11-25',
        closePrice: 10.76,
        tradeDirectionInd: 'D',
        settlementStatus: 'OPEN',
      },
      {
        netObligationId: '7d7cc4af-7b8a-4fd3-1234-14158b2d9f2a',
        securityName: 'Apple Inc Com',
        cusip: '037833100',
        ticker: 'AAPL',
        isin: null,
        participantAccountId: '17391393',
        netQuantity: 600,
        netTradeAmount: 2834874.0,
        settlementValue: 6456.0,
        settlementDate: '2020-11-25',
        closePrice: 10.76,
        tradeDirectionInd: 'D',
        settlementStatus: 'CLOSED',
      },
    ]);

    httpMock.verify();
  });

  it('should search error simple', (done) => {
    service.search('00005208').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this Participant ID');
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-obligations');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '00005208',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-obligations');
    request.error('No information found for this Participant ID' as any);

    httpMock.verify();
  });

  it('should search error nested', (done) => {
    service.search('00005208').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this Participant ID');
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-obligations');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '00005208',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-obligations');
    request.error(
      new ErrorEvent('error', {
        error: { description: 'No information found for this Participant ID' },
      })
    );

    httpMock.verify();
  });

  it('should search error 500 internal server error', (done) => {
    service.search('00005208').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toEqual({
          code: 500,
          description: 'Internal Server Error',
        });
        done();
      },
    });
    const request = httpMock.expectOne('./api/netting/v1/netted-obligations');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      participantId: '00005208',
    });
    expect(request.request.url).toBe('./api/netting/v1/netted-obligations');
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

  it('should trades', (done) => {
    service.trades('00005208', 'ticker').subscribe((trades) => {
      expect(trades).toEqual([
        {
          tradeId: null,
          ticker: 'ticker',
          cusip: '02079K107',
          market: null,
          buySell: 'Buy',
          quantity: 5800,
          tradePrice: 5844.82,
          tradeAmount: 33899956,
          settlementDate: '2020-12-01',
          tradeDate: '2020-12-01',
        },
        {
          tradeId: null,
          ticker: 'ticker',
          cusip: '02079K107',
          market: null,
          buySell: 'Sell',
          quantity: 5400,
          tradePrice: 2468.74,
          tradeAmount: 13331195.999999998,
          settlementDate: '2020-12-01',
          tradeDate: '2020-12-01',
        },
      ]);
      done();
    });

    const request = httpMock.expectOne(
      './api/novation/v1/novated-trades?nettedObligationId=00005208'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe(
      './api/novation/v1/novated-trades?nettedObligationId=00005208'
    );
    request.flush([
      {
        tradeId: null,
        buyer: 'CN=BR17391393, OU=BROKERB, O=BROKERB, L=London, C=GB',
        nettedObligationId: '6181a9a1-c249-40e7-b931-329cd98ab22b',
        novatedStatus: 'NETTED',
        participantAccountId: '17391393',
        participants: [
          'CN=BR17391393, OU=BROKERB, O=BROKERB, L=London, C=GB',
          'OU=DTCCA, O=DTCCA, L=New York, C=US',
        ],
        principalTradeAmount: 33899956,
        quantity: 5800,
        securityId: '02079K107',
        seller: 'OU=DTCCA, O=DTCCA, L=New York, C=US',
        settlementDate: '2020-12-01',
        tradePrice: 5844.82,
        type: 'Long',
        market: null,
        tradeDate: '2020-12-01',
      },
      {
        tradeId: null,
        buyer: 'CN=BR17391393, OU=BROKERB, O=BROKERB, L=London, C=GB',
        nettedObligationId: '6181a9a1-c249-40e7-b931-329cd98ab22b',
        novatedStatus: 'NETTED',
        participantAccountId: '17391393',
        participants: [
          'CN=BR17391393, OU=BROKERB, O=BROKERB, L=London, C=GB',
          'OU=DTCCA, O=DTCCA, L=New York, C=US',
        ],
        principalTradeAmount: 13331195.999999998,
        quantity: 5400,
        securityId: '02079K107',
        seller: 'OU=DTCCA, O=DTCCA, L=New York, C=US',
        settlementDate: '2020-12-01',
        tradePrice: 2468.74,
        type: 'Short',
        market: null,
        tradeDate: '2020-12-01',
      },
    ]);

    httpMock.verify();
  });

  it('should trade error simple', (done) => {
    service.trades('00005208', 'ticker').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });
    const request = httpMock.expectOne(
      './api/novation/v1/novated-trades?nettedObligationId=00005208'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe(
      './api/novation/v1/novated-trades?nettedObligationId=00005208'
    );
    request.error('error happened' as any);

    httpMock.verify();
  });

  it('should trade error nested', (done) => {
    service.trades('00005208', 'ticker').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });

    const request = httpMock.expectOne(
      './api/novation/v1/novated-trades?nettedObligationId=00005208'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toBe(
      './api/novation/v1/novated-trades?nettedObligationId=00005208'
    );
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });

  it('should transactions', (done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
    service.transactions('00005208').subscribe((transactions) => {
      expect(transactions).toEqual([
        {
          transactionId: '53521',
          cusip: '88160R101',
          contra: 323,
          deliverReceiver: 'Receiver',
          quantity: 10,
          tradeAmount: 1010,
          status: 'Pending',
          activity: 'Funds Rsvr',
          source: 'FRES',
          reason: '1',
        },
        {
          transactionId: '433242',
          cusip: '88160R101',
          contra: 57,
          deliverReceiver: 'Receiver',
          quantity: 25,
          tradeAmount: 2450,
          status: 'Pending',
          activity: 'Funds Rsvr',
          source: 'FRES',
          reason: '1',
        },
        {
          transactionId: '2893',
          cusip: '88160R101',
          contra: 385,
          deliverReceiver: 'Deliverer',
          quantity: 40,
          tradeAmount: 4120,
          status: 'Pending',
          activity: 'Funds Rsvr',
          source: 'FRES',
          reason: '2',
        },
        {
          transactionId: '38164',
          cusip: '88160R101',
          contra: 598,
          deliverReceiver: 'Receiver',
          quantity: 45,
          tradeAmount: 5225,
          status: 'Pending',
          activity: 'Funds Rsvr',
          source: 'FRES',
          reason: '2',
        },
      ]);
      done();
    });
  });
});
