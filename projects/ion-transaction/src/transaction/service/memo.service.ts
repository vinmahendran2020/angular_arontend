import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
} from 'ion-core';

import {
  IMemoResponse,
  IMemo,
  IMemoBalace,
  IMemoBalanceResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  constructor(private client: HttpClient) {}

  submit(participantId: string, memos: IMemo[]): Observable<IMemoResponse[]> {
    return this.client
      .post<IMemoResponse[]>(
        `/api/settlement/v1/update-memo-seg/${participantId}`,
        memos.map((memo) => ({
          cusip: memo.cusip.value,
          action: memo.action.value,
          quantity: memo.quantity.value,
        }))
      )
      .pipe(
        map((results: IMemoResponse[]) => {
          const ids = memos.map((memo) => memo.id.value);
          return results.map((result, index) => ({
            ...result,
            rowNo: ids[index],
          }));
        }),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(
            response,
            'No information found for this Participant ID'
          )
        )
      );
  }

  balance(participantId: string, cusip: string): Observable<IMemoBalace> {
    const datex = new Date();
    const date = `${(datex.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${datex
      .getDate()
      .toString()
      .padStart(2, '0')}/${datex.getFullYear()}`;
    return this.client
      .post<IMemoBalanceResponse>(`./api/position/v1/balance`, {
        participantId,
        cusip,
        date,
      })
      .pipe(
        map((response: IMemoBalanceResponse) => {
          const cusipName = response.securityName;
          const pledge = response.position.pledgeQty;
          const netAdditions = response.position.naQty;
          const minimumAmount = response.position.maQty;
          const memoSegregation = response.position.msegQty;
          const totalFreeExcess =
            netAdditions + minimumAmount - memoSegregation;
          const totalPositions = totalFreeExcess + pledge;
          return {
            cusipId: cusip,
            participantId,
            cusipName,
            memoSegregation,
            totalFreeExcess,
            totalPositions,
          };
        }),
        catchError((response: IHttpErrorResponse) =>
          throwError('No information found for this CUSIP')
        )
      );
  }
}
