import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import moment from 'moment';

import {
  IHttpErrorResponse,
  throwErrorMessage,
} from 'ion-core';

import { IScheduleInterval, IScheduleResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ShellService {
  constructor(private client: HttpClient) {}

  intervals(): Observable<IScheduleInterval> {
    return this.client
      .get<IScheduleResponse>(`./api/schedule/v1/next-intervals`)
      .pipe(
        map((schedule: IScheduleResponse) => ({
          netting: schedule.Netting ? moment(schedule.Netting).format() : null,
          cash: schedule.Cash ? moment(schedule.Cash).format() : null,
          security: schedule.SecuritiesSettlement
            ? moment(schedule.SecuritiesSettlement).format()
            : null,
          start: schedule.StartOfDay
            ? moment(schedule.StartOfDay).format()
            : null,
          end: schedule.EndOfDay
          ? moment(schedule.StartOfDay).format()
          : null,
          
        })),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }
}
