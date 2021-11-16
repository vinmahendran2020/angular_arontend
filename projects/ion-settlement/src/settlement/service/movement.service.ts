import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { IMovement, IMovementResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private client: HttpClient) {}

  search(participantId: string, businessDate: string): Observable<IMovement[]> {
    return this.client
      .get<IMovementResponse[]>(
        `./api/settlement/v1/ion-cash-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((movements: IMovementResponse[]) =>
          movements.map((movement) => ({
            participantId: movement.participantId,
            transactionId: movement.cashEventId,
            action: movement.action,
            amount: movement.amount,
            date: movement.timeStamp,
            status: movement.status,
            timeStamp: movement.timeStamp,
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
          //     action: 'Deposit',
          //     amount: 100,
          //     date: '03/04/2021',
          //     status: 'Made',
          //     timeStamp: '',
          //   },
          //   {
          //     participantId,
          //     transactionId: '83U-4543',
          //     action: 'Withdraw',
          //     amount: 2,
          //     date: '03/14/2021',
          //     status: 'Made',
          //     timeStamp: '',
          //   },
          //   {
          //     participantId,
          //     transactionId: '83U-4543',
          //     action: 'Withdraw',
          //     amount: 200,
          //     date: '03/21/2021',
          //     status: 'Made',
          //     timeStamp: '',
          //   },
          // ])
        )
      );
  }
}
