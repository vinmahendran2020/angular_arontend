import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
  throwErrorMessage,
} from 'ion-core';

import {
  ICCASummary,
  ICCATransactionDetail,
  INetCCAResponse,
  ICCAResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class CCAService {
  constructor(private client: HttpClient) {}

  search(
    participantId: string,
    startDate: string,
    endDate: string
  ): Observable<ICCASummary> {
    return this.client
      .post<INetCCAResponse[]>('./api/netting/v1/netted-ccas', {
        participantId,
        startDate,
        endDate,
      })
      .pipe(
        map((response: INetCCAResponse[]) => {
          return {
            participantId,
            adjustments: response.map((cca) => ({
              ccaId: cca.ccaId,
              settlementDate: cca.ccaSettlementDate,
              debitCredit: cca.ccaDirection === 'D' ? 'Debit' : 'Credit',
              netCCAAmount: cca.netCCAAmount,
              settlementStatus: cca.ccaStatus,
            })),
          };
        }),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(
            response,
            'No information found for this Participant ID'
          )
        )
      );
  }

  transactions(ccaId: string): Observable<ICCATransactionDetail> {
    return this.client
      .get<ICCAResponse[]>(`./api/netting/v1/netted-cca/${ccaId}`)
      .pipe(
        map((response: ICCAResponse[]) => {
          return {
            ccaId,
            cusip: '',
            debits: response
              .filter((cca) => cca.ccaDirection === 'D')
              .map((cca) => ({
                netObligationId: cca.nettedObligationId,
                cusip: cca.cusip,
                ticker: cca.ticker,
                ccaAmount: cca.ccaAmount,
                netBuySell: cca.netBuyOrSell,
                netQuantity: cca.netQuantity,
                closePrice: cca.closePrice,
                netTradeAmount: cca.netTradeAmount,
                netObligationStatus: cca.nettedObligationStatus,
                direction: cca.ccaDirection,
              })),
            credits: response
              .filter((cca) => cca.ccaDirection === 'C')
              .map((cca) => ({
                netObligationId: cca.nettedObligationId,
                cusip: cca.cusip,
                ticker: cca.ticker,
                ccaAmount: cca.ccaAmount,
                netBuySell: cca.netBuyOrSell,
                netQuantity: cca.netQuantity,
                closePrice: cca.closePrice,
                netTradeAmount: cca.netTradeAmount,
                netObligationStatus: cca.nettedObligationStatus,
                direction: cca.ccaDirection,
              })),
          };
        }),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }
}
