import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { IAdjustment, IAdjustmentResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AdjustmentService {
  constructor(private client: HttpClient) {}

  search(
    participantId: string,
    businessDate: string
  ): Observable<IAdjustment[]> {
    return this.client
      .get<IAdjustmentResponse[]>(
        `./api/netting/v1/netted-ccas-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((adjustments: IAdjustmentResponse[]) =>
          adjustments.map((adjustment) => ({
            transactionId: adjustment.ccaId,
            participantId: adjustment.participantAccountId,
            settlementDate: adjustment.ccaSettlementDate,
            // TODO: revisit this
            action: adjustment.ccaDirection === 'Short' ? 'Debit' : 'Credit',
            amount: adjustment.netCCAAmount,
            status: adjustment.ccaStatus,
            // TODO: revisit these
            creationDate: '',
            creationTime: '',
          }))
        ),
        catchError(
          (response: IHttpErrorResponse) =>
            throwInternalError(response, 'No summary found')
          // TODO: until settlement API works
          // of([
          //   {
          //     transactionId: '83U-4543',
          //     participantId: '00005208',
          //     action: 'Credit',
          //     amount: 20,
          //     status: 'Open',
          //     settlementStatus: 'Awaiting RAD Approval',
          //     settlementDate: '01/21/2021',
          //     creationDate: '',
          //     creationTime: '',
          //   },
          //   {
          //     transactionId: '67U-4543',
          //     participantId: '00005208',
          //     action: 'Credit',
          //     amount: 20,
          //     status: 'Open',
          //     settlementStatus: 'Cancelled in RAD',
          //     settlementDate: '03/11/2021',
          //     creationDate: '',
          //     creationTime: '',
          //   },
          //   {
          //     transactionId: '27X-4553',
          //     participantId: '00005208',
          //     action: 'Debit',
          //     amount: 20,
          //     status: 'Made',
          //     settlementStatus: 'Pending',
          //     settlementDate: '01/16/2021',
          //     creationDate: '',
          //     creationTime: '',
          //   },
          // ])
        )
      );
  }
}
