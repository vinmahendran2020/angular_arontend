import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
} from 'ion-core';

import {
  IDeliverySearchResponse,
  IDelivery,
  IDeliverySubmitResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private client: HttpClient) {}

  search(participantId: string): Observable<IDelivery[]> {
    return this.client
      .get<IDeliverySearchResponse[]>(
        `./api/trade-capture/v1/list-delivery-orders/${participantId}`
      )
      .pipe(
        map((deliveries: IDeliverySearchResponse[]) =>
          deliveries
            .filter((delivery) => delivery.bilateralTradeStatus === 'PROPOSED')
            .map(
              (delivery) =>
                ({
                  operation: 'select',
                  id: delivery.bilateralTransactionId,
                  deliverer: delivery.delivererId,
                  receiver: delivery.receiverId,
                  comment: delivery.comment,
                  prefunded: delivery.prefunded,
                  cusip: delivery.securityId,
                  amount: delivery.settlementAmount,
                  date: delivery.settlementDate,
                  quantity: delivery.shrQty,
                  status: delivery.bilateralTradeStatus,
                  reason: delivery.pendingReasonCode,
                } as IDelivery)
            )
        ),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(
            response,
            'No information found for this Participant ID'
          )
        )
      );
  }

  submit(
    participantId: string,
    deliveries: IDelivery[]
  ): Observable<IDeliverySubmitResponse[]> {
    return this.client
      .post<IDeliverySubmitResponse[]>(
        `./api/trade-capture/v1/update-delivery-orders/${participantId}`,
        deliveries.map((delivery) => ({
          bilateralTransactionId: delivery.id,
          tradeStatus:
            delivery.operation === 'approve' ? 'APPROVED' : 'CANCELLED',
        }))
      )
      .pipe(
        map((results: IDeliverySubmitResponse[]) => {
          const ids = deliveries.map((delivery) => delivery.id);
          return results.map((result, index) => ({
            ...result,
            id: ids[index],
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
