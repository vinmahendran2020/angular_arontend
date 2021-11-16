import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwInternalError } from 'ion-core';

import { IPreposition, IPrepositionResponse } from '../types';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class PrepositionService {
  constructor(private client: HttpClient) {}

  search(
    participantId: string,
    businessDate: string
  ): Observable<IPreposition[]> {
    return this.client
      .get<IPrepositionResponse[]>(
        `./api/settlement/v1/pledges-inquiry/${participantId}?businessDate=${formatDate(
          businessDate
        )}`
      )
      .pipe(
        map((prepositions: IPrepositionResponse[]) =>
          prepositions.map((preposition) => ({
            transactionId: preposition.pledgeId,
            participantId: preposition.participantId,
            cusipName: preposition.securityName,
            cusipId: preposition.cusip,
            action: preposition.eventType,
            quantity: preposition.quantity,
            status: preposition.status,
          }))
        ),
        catchError(
          (response: IHttpErrorResponse) =>
            throwInternalError(response, 'No summary found')
          // TODO: until settlement API works
          // of([
          //   {
          //     transactionId: '83U-4543',
          //     participantId: '00001116',
          //     cusipName: 'APPLE Inc.',
          //     cusipId: '83745363',
          //     quantity: 100,
          //     amount: 20,
          //     action: 'Release',
          //     status: 'Made',
          //   },
          //   {
          //     transactionId: '67U-4543',
          //     participantId: '00005208',
          //     cusipName: 'Google',
          //     cusipId: '6765756',
          //     quantity: 500,
          //     amount: 800,
          //     action: 'Pledge',
          //     status: 'Made',
          //   },
          //   {
          //     transactionId: '27X-4553',
          //     participantId: '00001116',
          //     cusipName: 'IBM',
          //     cusipId: '56456',
          //     quantity: 100,
          //     amount: 20,
          //     action: 'Release',
          //     status: 'Made',
          //   },
          // ])
        )
      );
  }
}
