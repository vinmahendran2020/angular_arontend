import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
  throwErrorMessage,
} from 'ion-core';

import { IOrderResponse, IOrder } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private client: HttpClient) {}

  submit(
    participantId: string,
    orders: IOrder[]
  ): Observable<IOrderResponse[]> {
    return this.client
      .post<IOrderResponse[]>(
        `./api/trade-capture/v1/submit-delivery-orders/${participantId}`,
        orders.map((order) => ({
          delivererId: participantId,
          receiverId: order.receiver.value,
          comment: order.comment.value,
          prefunded: order.prefunded.value,
          securityId: order.cusip.value,
          settlementAmount: parseInt(order.amount.value, 10),
          settlementDate: formatDate(order.date.value),
          shrQty: parseInt(order.quantity.value, 10),
        }))
      )
      .pipe(
        map((results: IOrderResponse[]) => {
          const ids = orders.map((order) => order.id.value);
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
}
