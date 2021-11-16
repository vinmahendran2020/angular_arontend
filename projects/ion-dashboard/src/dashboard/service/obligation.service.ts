import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
  throwErrorMessage,
} from 'ion-core';

import {
  IObligationResponse,
  IObligationSummary,
  IObligationTrade,
  IObligationTransaction,
  IObligationTradeResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class ObligationService {
  constructor(private client: HttpClient) {}

  search(participantId: string): Observable<IObligationSummary> {
    return this.client
      .post<IObligationResponse[]>(`./api/netting/v1/netted-obligations`, {
        participantId,
      })
      .pipe(
        map((obligations: IObligationResponse[]) => {
          return {
            cusip: '',
            sortBy: undefined,
            longs: obligations
              .filter(
                (obligation) =>
                  obligation.tradeDirectionInd === 'R' &&
                  obligation.settlementStatus === 'OPEN'
              )
              .map((obligation) => {
                const {
                  participantAccountId,
                  tradeDirectionInd,
                  ...others
                } = obligation;
                return others;
              }),
            shorts: obligations
              .filter(
                (obligation) =>
                  obligation.tradeDirectionInd === 'D' &&
                  obligation.settlementStatus === 'OPEN'
              )
              .map((obligation) => {
                const {
                  participantAccountId,
                  tradeDirectionInd,
                  ...others
                } = obligation;
                return others;
              }),
            closed: obligations
              .filter((obligation) => obligation.settlementStatus === 'CLOSED')
              .map((obligation) => {
                const {
                  participantAccountId,
                  tradeDirectionInd,
                  ...others
                } = obligation;
                return others;
              }),
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

  trades(obligationId: string, ticker: string): Observable<IObligationTrade[]> {
    return this.client
      .get<IObligationTradeResponse[]>(
        `./api/novation/v1/novated-trades?nettedObligationId=${obligationId}`
      )
      .pipe(
        map((response: IObligationTradeResponse[]) =>
          response.map((trade) => ({
            tradeId: trade.tradeId,
            ticker,
            cusip: trade.securityId,
            market: trade.market,
            buySell: trade.type === 'Long' ? 'Buy' : 'Sell',
            quantity: trade.quantity,
            tradePrice: trade.tradePrice,
            tradeAmount: trade.principalTradeAmount,
            settlementDate: trade.settlementDate,
            tradeDate: trade.tradeDate,
          }))
        ),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }

  transactions(obligationId: string): Observable<IObligationTransaction[]> {
    // TODO: fake implementation. will be replaced with api.
    return timer(500).pipe(
      map(() => [
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
      ])
    );
  }
}
