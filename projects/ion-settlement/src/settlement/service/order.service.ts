import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { IOrder, IOrderResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private client: HttpClient) {}

  search(participantId: string, businessDate: string): Observable<IOrder[]> {
    return this.client
      .get<IOrderResponse[]>(
        `./api/trade-capture/v1/delivery-orders-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((orders: IOrderResponse[]) =>
          orders.map((order) => ({
            transactionId: order.bilateralTransactionId,
            delivererId: order.delivererId,
            receiverId: order.receiverId,
            cusipName: order.securityName,
            cusipId: order.securityId,
            quantity: order.shrQty,
            amount: order.settlementAmount,
            prefunded: order.prefunded ? 'Yes' : 'No',
            settlementDate: order.settlementDate,
            settlementStatus: order.bilateralTradeStatus,
            pendingReason: order.pendingReasonCode,
          }))
        ),
        catchError(
          (response: IHttpErrorResponse) =>
            throwInternalError(response, 'No summary found')
          // TODO: until settlement API works
          // of([
          //   {
          //     transactionId: '83U-4543',
          //     delivererId: '00005208',
          //     receiverId: '00001116',
          //     cusipName: 'APPLE Inc.',
          //     cusipId: '83745363',
          //     quantity: 100,
          //     amount: 20,
          //     prefunded: 'Yes',
          //     settlementStatus: 'Awaiting RAD Approval',
          //     settlementDate: '01/21/2021',
          //     pendingReason: '1 - Insufficient Shares',
          //   },
          //   {
          //     transactionId: '67U-4543',
          //     delivererId: '00001116',
          //     receiverId: '00005208',
          //     cusipName: 'Google',
          //     cusipId: '6765756',
          //     quantity: 500,
          //     amount: 800,
          //     prefunded: 'No',
          //     settlementStatus: 'Cancelled in RAD',
          //     settlementDate: '03/11/2021',
          //     pendingReason: '3 - Receiver Insufficient Collateral',
          //   },
          //   {
          //     transactionId: '27X-4553',
          //     delivererId: '00005208',
          //     receiverId: '00001116',
          //     cusipName: 'IBM',
          //     cusipId: '56456',
          //     quantity: 100,
          //     amount: 20,
          //     prefunded: 'Yes',
          //     settlementStatus: 'Pending',
          //     settlementDate: '01/16/2021',
          //     pendingReason: '5 - Insufficient Ion Cash',
          //   },
          // ])
        )
      );
  }
}
