import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { IMemo, IMemoResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  constructor(private client: HttpClient) {}

  search(participantId: string, businessDate: string): Observable<IMemo[]> {
    return this.client
      .get<IMemoResponse[]>(
        `./api/settlement/v1/memo-segregation-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((memos: IMemoResponse[]) =>
          memos.map((memo) => ({
            participantId: memo.participantId,
            transactionId: memo.linearId,
            cusipName: memo.securityName,
            cusipId: memo.securityId,
            action: memo.memoSegAction,
            quantity: memo.quantity,
            status: memo.status,
            timeStamp: memo.timeStamp,
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
          //     cusipName: 'APPLE Inc.',
          //     cusipId: '83745363',
          //     action: 'Add',
          //     quantity: 100,
          //     status: 'Made',
          //     timeStamp: '',
          //   },
          //   {
          //     participantId,
          //     transactionId: '456-678',
          //     cusipName: 'Google',
          //     cusipId: '14745363',
          //     action: 'Subtract',
          //     quantity: 50,
          //     status: 'Made',
          //     timeStamp: '',
          //   },
          //   {
          //     participantId,
          //     transactionId: '354-4543',
          //     cusipName: 'IBM',
          //     cusipId: '3845363',
          //     action: 'Overlay',
          //     quantity: 10,
          //     status: 'Made',
          //     timeStamp: '',
          //   },
          // ])
        )
      );
  }
}
