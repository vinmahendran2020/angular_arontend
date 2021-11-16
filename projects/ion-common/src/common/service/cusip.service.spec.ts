import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ISecurity } from 'ion-core';

import { CusipService } from './cusip.service';
import { ICusipForm } from '../types/cusip';

describe('CusipService', () => {
  let service: CusipService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CusipService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify search', (done) => {
    const form: ICusipForm = {
      securityName: 'test',
      issuerName: 'test',
      ticker: 'test',
    };

    const response: ISecurity[] = [
      {
        collBlckInd: 'string',
        cusip: 'string',
        hairCutVal: 'string',
        issuerId: 'string',
        issuerName: 'string',
        issuerTypeInd: 'string',
        lglPartId: 'string',
        name: 'string',
        price: 0,
        securityId: 'string',
        securityStatusCode: 'string',
        subIssueType: 'string',
        ticker: 'string',
        tstCusipInd: 'string',
        createTimeStamp: null,
        updateTimeStamp: null,
      },
    ];

    service.search(form).subscribe((securities) => {
      expect(securities).toBeTruthy();
      expect(securities).toEqual({
        items: [
          {
            cusip: response[0].cusip,
            security: response[0].name,
            issuer: response[0].issuerId,
            price: response[0].price,
            selected: false,
          },
        ],
      });
      done();
    });

    const request = httpMock.expectOne('./api/security-master/v1/securities');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(form);
    expect(request.request.url).toMatch('./api/security-master/v1/securities');
    request.flush(response);

    httpMock.verify();
  });

  it('should error a message on search', (done) => {
    const form: ICusipForm = {
      securityName: 'test',
      issuerName: 'test',
      ticker: 'test',
    };

    service.search(form).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No results found.');
        done();
      },
    });

    const request1 = httpMock.expectOne('./api/security-master/v1/securities');
    expect(request1.request.method).toBe('POST');
    expect(request1.request.body).toEqual(form);
    expect(request1.request.url).toMatch('./api/security-master/v1/securities');
    request1.error('No results found.' as any);

    httpMock.verify();

    httpMock.verify();
  });

  it('should error with description on search', (done) => {
    const form: ICusipForm = {
      securityName: 'test',
      issuerName: 'test',
      ticker: 'test',
    };

    service.search(form).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No results found.');
        done();
      },
    });

    const request = httpMock.expectOne('./api/security-master/v1/securities');
    expect(request.request.url).toMatch('./api/security-master/v1/securities');
    request.error(
      new ErrorEvent('error', { error: { description: 'No results found.' } })
    );

    httpMock.verify();
  });
});
