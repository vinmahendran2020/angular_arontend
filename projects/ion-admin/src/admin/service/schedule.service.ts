import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import * as moment from 'moment-timezone';

import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { IHttpErrorResponse, throwErrorMessage } from 'ion-core';

import {
  ISchedule,
  ScheduleType,
  IScheduleDetails,
  IScheduleStatus,
  IScheduleResponse,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private client: HttpClient) {}

  current(type: ScheduleType): Observable<IScheduleDetails> {
    return this.client
      .get<IScheduleResponse>(
        `./api/schedule/v1/schedule-details?scheduleName=${type}`
      )
      .pipe(
        map(({ schedule, statuses }: IScheduleResponse) => ({
          status: {
            netting: statuses.Netting,
            securitiesSettlement: statuses.SecuritiesSettlement,
            cash: statuses.Cash,
            start: statuses.StartOfDay,
            end: statuses.EndOfDay,
          } as IScheduleStatus,
          schedule: {
            scheduleType: schedule.scheduleType,
            startTime: moment(schedule.startTime)
              .tz(schedule.timezone)
              .format('h:mmA'),
            endTime: moment(schedule.endTime)
              .tz(schedule.timezone)
              .format('h:mmA'),
            timezone: schedule.timezone,
            hours: schedule.intervalHours,
            minutes: schedule.intervalMinutes,
            status: schedule.status,
          } as ISchedule,
        })),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }

  status(type: ScheduleType): Observable<boolean> {
    return this.client
      .get<boolean>(`./api/schedule/v1/in-progress?scheduleName=${type}`)
      .pipe(
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }

  run(type: ScheduleType, settlementDate?: string): Observable<string> {
    return this.client
      .post(
        `./api/schedule/v1/run-schedule`,
        {
          scheduleName: type,
          scheduleDate: settlementDate,
        },
        { responseType: 'text' }
      )
      .pipe(
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }

  submit(type: ScheduleType, schedule: ISchedule): Observable<ISchedule> {
    const { startTime, endTime } = schedule;
    return this.client
      .put(
        `./api/schedule/v1/schedule`,
        {
          scheduleType: type,
          status: schedule.status,
          startTime: moment
            .tz(startTime, 'h:mmA', schedule.timezone)
            .utc()
            .format(),
          endTime: moment
            .tz(endTime, 'h:mmA', schedule.timezone)
            .utc()
            .format(),
          timezone: schedule.timezone,
          intervalHours: schedule.hours,
          intervalMinutes: schedule.minutes,
        },
        { responseType: 'text' }
      )
      .pipe(
        map((value) => schedule),
        catchError((response: IHttpErrorResponse) =>
          throwErrorMessage(response)
        )
      );
  }
}
