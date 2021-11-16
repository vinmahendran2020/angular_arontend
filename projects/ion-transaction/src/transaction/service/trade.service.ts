import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  IParticipant,
  ISecurity,
  IHttpErrorResponse,
  throwInternalError,
} from 'ion-core';

import { ITrade, ITradeState, ITradeSummary } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private client: HttpClient) {}

  listParticipants(): Observable<Array<string>> {
    return this.client
      .get<IParticipant[]>(`./api/entity-master/v1/participants`)
      .pipe(
        map((response: IParticipant[]) =>
          response.map((participant) => participant.partId)
        ),
        catchError((response: IHttpErrorResponse) =>
          throwError('No information found')
        )
      );
  }

  listSecurities(): Observable<Array<string>> {
    return this.client
      .post<ISecurity[]>(`./api/security-master/v1/securities`, {})
      .pipe(
        map((response: ISecurity[]) =>
          response.map((security) => security.cusip)
        ),
        catchError((response: IHttpErrorResponse) =>
          throwError('No information found')
        )
      );
  }

  generateTrades(state: ITradeState): Observable<ITrade[]> {
    return this.client
      .post<ITrade[]>('./api/trade-generator/v1/generate-trades', {
        count: state.form.count,
        eligibleParticipantIds: state.participants,
        participantId: state.form.participantId.includes('All')
          ? state.participants
          : state.form.participantId,
        cusip: state.form.cusip.includes('All')
          ? state.securities
          : state.form.cusip,
        direction: state.form.direction.includes('All')
          ? state.directions
          : state.form.direction,
        settlementType: state.form.settlementType.includes('All')
          ? state.settlementTypes
          : state.form.settlementType,
      })
      .pipe(
        map((response: ITrade[]) => response),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(response, 'No information found')
        )
      );
  }

  submitTrades(summary: ITradeSummary): Observable<string> {
    return this.client
      .post<string>('./api/trade-generator/v1/submit-trades', summary.trades)
      .pipe(
        map((response: string) => response),
        catchError((response: IHttpErrorResponse) =>
          throwInternalError(response, 'No information found')
        )
      );
  }
}
