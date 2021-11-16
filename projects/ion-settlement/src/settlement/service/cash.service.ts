import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { ICash, ICashResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  constructor(private client: HttpClient) {}

  search(participantId: string, businessDate: string): Observable<ICash[]> {
    return this.client
      .get<ICashResponse[]>(
        `./api/cash-settlement/v1/cash-settlement-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((cashs: ICashResponse[]) =>
          cashs.map((cash) => ({
            participantId: cash.participantAccountId,
            transactionId: cash.transactionId,
            // TODO: investigate
            action: cash.creditBalance > 0 ? 'Credit' : 'Debit',
            amount: cash.netBalance,
            date: cash.creationDate,
            status: cash.status,
            // TODO: investigate
            time: cash.creationDate,
          }))
        ),
        catchError(
          (response: IHttpErrorResponse) =>
            throwInternalError(response, 'No summary found')
          // TODO: until settlement API works
          // of([
          //   {
          //     participantId,
          //     transactionId: '83U-4543',
          //     action: 'Debit',
          //     amount: 100,
          //     date: '03/04/2021',
          //     status: 'Made',
          //     time: '',
          //   },
          //   {
          //     participantId,
          //     transactionId: '83U-4543',
          //     action: 'Debit',
          //     amount: 2,
          //     date: '03/14/2021',
          //     status: 'Made',
          //     time: '',
          //   },
          //   {
          //     participantId,
          //     transactionId: '83U-4543',
          //     action: 'Credit',
          //     amount: 200,
          //     date: '03/21/2021',
          //     status: 'Made',
          //     time: '',
          //   },
          // ])
        )
      );
  }
}
