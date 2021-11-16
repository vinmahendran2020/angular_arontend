import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { IObligation, IObligationResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ObligationService {
  constructor(private client: HttpClient) {}

  search(
    participantId: string,
    businessDate: string
  ): Observable<IObligation[]> {
    return this.client
      .get<IObligationResponse[]>(
        `./api/netting/v1/netted-obligations-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((obligations: IObligationResponse[]) =>
          obligations.map((obligation) => ({
            transactionId: obligation.netObligationId,
            parentId: obligation.parentObligationId,
            participantId: obligation.participantAccountId,
            cusipName: obligation.securityName,
            cusipId: obligation.cusip,
            direction: obligation.tradeDirectionInd,
            quantity: obligation.netQuantity,
            amount: obligation.netTradeAmount,
            closePrice: obligation.closePrice,
            settlementValue: obligation.settlementValue,
            settlementDate: obligation.settlementDate,
            settlementStatus: obligation.settlementStatus,
            pendingReason: obligation.pendingReasonCode,
          }))
        ),
        catchError(
          (response: IHttpErrorResponse) =>
            throwInternalError(response, 'No summary found')
          // TODO: until settlement API works
          // of([
          //   {
          //     transactionId: '83U-4543',
          //     parentId: '00005208',
          //     participantId: '00001116',
          //     cusipName: 'APPLE Inc.',
          //     cusipId: '83745363',
          //     direction: 'Short',
          //     quantity: 100,
          //     amount: 20,
          //     closePrice: 24,
          //     settlementValue: 300,
          //     settlementStatus: 'Awaiting RAD Approval',
          //     settlementDate: '01/21/2021',
          //     pendingReason: '1 - Insufficient Shares',
          //   },
          //   {
          //     transactionId: '67U-4543',
          //     parentId: '00001116',
          //     participantId: '00005208',
          //     cusipName: 'Google',
          //     cusipId: '6765756',
          //     direction: 'Short',
          //     quantity: 40,
          //     amount: 60,
          //     closePrice: 80,
          //     settlementValue: 600,
          //     settlementStatus: 'Cancelled in RAD',
          //     settlementDate: '03/11/2021',
          //     pendingReason: '3 - Receiver Insufficient Collateral',
          //   },
          //   {
          //     transactionId: '27X-4553',
          //     parentId: '00005208',
          //     participantId: '00001116',
          //     cusipName: 'IBM',
          //     cusipId: '56456',
          //     direction: 'Long',
          //     quantity: 107,
          //     amount: 390,
          //     closePrice: 30,
          //     settlementValue: 789,
          //     settlementStatus: 'Pending',
          //     settlementDate: '01/16/2021',
          //     pendingReason: '5 - Insufficient Ion Cash',
          //   },
          // ])
        )
      );
  }
}
