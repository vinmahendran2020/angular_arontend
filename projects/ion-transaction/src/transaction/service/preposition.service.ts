import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IHttpErrorResponse,
  throwInternalError,
} from 'ion-core';

import { IPrepositionResponse } from '../types';

import { IPreposition } from '../types/preposition';

@Injectable({
  providedIn: 'root',
})
export class PrepositionService {
  constructor(private client: HttpClient) {}

  submit(
    participantId: string,
    pledges: IPreposition[]
  ): Observable<IPrepositionResponse[]> {
    return this.client
      .post<IPrepositionResponse[]>(
        `./api/settlement/v1/submit-pledge-instructions/${participantId}`,
        pledges.map((pledge) => ({
          cusip: pledge.cusip.value,
          pledgeInstruction: pledge.action.value,
          amount: parseInt(pledge.quantity.value, 10),
        }))
      )
      .pipe(
        map((results: IPrepositionResponse[]) => {
          const ids = pledges.map((pledge) => pledge.id.value);
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
