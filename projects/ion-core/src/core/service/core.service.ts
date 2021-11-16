import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import get from 'lodash.get';

import {
  IPrincipal,
  IAuthSuccess,
  ILegalEntity,
  IParticipant,
  ICusip,
  IHttpErrorResponse,
} from '../types';
import { throwErrorMessage } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public static readonly STORAGE_KEY = '__storage__';

  private static PARTICIPANT = new Map<string, Observable<IParticipant>>();
  private static PARTICIPANTS = new Map<string, Observable<IParticipant[]>>();

  constructor(private client: HttpClient) {}

  getPrincipal(): IPrincipal {
    return get(
      JSON.parse(sessionStorage.getItem(CoreService.STORAGE_KEY) || '{}'),
      'core.principal'
    );
  }

  getEntityId(): string {
    const principal = this.getPrincipal();
    if (principal) {
      const decoded = jwt_decode(principal.idToken);
      const entity = decoded['custom:entity'];
      return entity;
    }
    return null;
  }

  getParticipants(): Observable<IParticipant[]> {
    const entityId = this.getEntityId();
    if (!entityId) {
      return of([]);
    }
    if (!CoreService.PARTICIPANTS.has(entityId)) {
      const participants$ = this.client
        .get<ILegalEntity>(`./api/entity-master/v1/legal-entity/${entityId}`)
        .pipe(
          map((etity: ILegalEntity) => etity.participants),
          catchError((response) => of([] as IParticipant[])),
          shareReplay(1)
        );
      CoreService.PARTICIPANTS.set(entityId, participants$);
    }
    return CoreService.PARTICIPANTS.get(entityId);
  }

  login(username: string, password: string): Observable<IPrincipal> {
    return this.client
      .post<IAuthSuccess>('./api/authentication/v1/login', {
        authType: 'credentials',
        username,
        password,
      })
      .pipe(
        map((response: IAuthSuccess) => ({
          user: username,
          ...response.data,
        })),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }

  logout(): void {
    CoreService.PARTICIPANT.clear();
    CoreService.PARTICIPANTS.clear();
  }

  refresh(username: string, token: string): Observable<IPrincipal> {
    return this.client
      .post<IAuthSuccess>('./api/authentication/v1/login', {
        authType: 'refresh',
        refreshToken: token,
      })
      .pipe(
        map((response: IAuthSuccess) => ({
          user: username,
          ...response.data,
        })),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }

  getParticipant(
    participantId: string,
    error: string = 'No information found for this Participant ID'
  ): Observable<IParticipant> {
    if (!CoreService.PARTICIPANT.has(participantId)) {
      const participant$ = this.client
        .get<IParticipant>(
          `./api/entity-master/v1/participant/${participantId}`
        )
        .pipe(
          catchError((response: IHttpErrorResponse) => throwError(error)),
          shareReplay(1)
        );
      CoreService.PARTICIPANT.set(participantId, participant$);
    }
    return CoreService.PARTICIPANT.get(participantId);
  }

  getCusip(
    cusip: string,
    error: string = 'No information found for this CUSIP'
  ): Observable<ICusip> {
    return this.client
      .get<ICusip>(`./api/security-master/v1/security/${cusip}`)
      .pipe(catchError((response: IHttpErrorResponse) => throwError(error)));
  }
}
