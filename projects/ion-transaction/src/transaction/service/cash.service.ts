import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwIfOnlyInternalError,
  throwErrorMessage,
} from 'ion-core';

import {
  ICashSummary,
  ICashSubmitResponse,
  ICashSearchResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class CashService {
  constructor(private client: HttpClient) {}

  search(participantId: string): Observable<ICashSummary> {
    return this.client
      .get<ICashSearchResponse>(
        `./api/settlement/v1/ion-cash-token/${participantId}`
      )
      .pipe(
        map((response: ICashSearchResponse) => ({
          balance: response.amount,
          currency: response.currency === 'USD' ? '$' : response.currency,
          holder: response.holder,
          issuer: response.issuer,
        })),
        catchError((response: IHttpErrorResponse) =>
          // throwErrorMessage(response, 'No Balance found for this Participant ID');
          throwIfOnlyInternalError(
            response,
            // temporary fix for bug APPDEV-1488
            {
              balance: 0,
              currency: '$',
              holder: null,
              issuer: null,
            }
          )
        )
      );
  }

  submit(
    participantId: string,
    operation: string,
    amount: string
  ): Observable<string> {
    return this.client
      .post<ICashSubmitResponse>(
        `/api/settlement/v1/manage-ion-cash/${participantId}`,
        {
          action: operation,
          ionCashAmount: amount,
        }
      )
      .pipe(
        map((response) => response.message),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }
}
