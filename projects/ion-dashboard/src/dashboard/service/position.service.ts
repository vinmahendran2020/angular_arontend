import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
} from 'ion-core';

import { IPositionSummary, IPosition } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  constructor(private client: HttpClient) {}

  search(
    participantId: string,
    cusip: string,
    settlementDate: string
  ): Observable<IPositionSummary> {
    const datex = new Date(settlementDate);
    const date = `${(datex.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${datex
      .getDate()
      .toString()
      .padStart(2, '0')}/${datex.getFullYear()}`;
    return this.client
      .post<IPosition>(`./api/position/v1/balance`, {
        participantId,
        cusip,
        date,
      })
      .pipe(
        map((response: IPosition) => {
          const security = response.securityName;
          const ticker = response.ticker;
          const pledged = response.position.pledgeQty;
          const netAdditions = response.position.naQty;
          const minimumAmount = response.position.maQty;
          const memoSegregation = response.position.msegQty;
          const totalFreeExcess =
            netAdditions + minimumAmount - memoSegregation;
          const totalPositions = totalFreeExcess + pledged;
          return {
            security,
            ticker,
            cusip,
            netAdditions,
            minimumAmount,
            memoSegregation,
            totalFreeExcess,
            pledged,
            totalPositions,
          };
        }),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(
            response,
            'No information found for this CUSIP'
          )
        )
      );
  }
}
