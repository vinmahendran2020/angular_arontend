import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ScheduleService } from '../../service/schedule.service';

import {
  SecurityScheduleFetch,
  SecurityScheduleFetchResult,
  SecurityScheduleFetchError,
  SecurityScheduleRun,
  SecurityScheduleRunResult,
  SecurityScheduleRunError,
  SecurityScheduleSubmit,
  SecurityScheduleSubmitResult,
  SecurityScheduleSubmitError,
  SecurityScheduleToggleError,
  SecurityScheduleToggleResult,
  SecurityScheduleToggle,
  SecuritySchedulePageDestroyed,
  SecurityScheduleClearPageError,
  SecuritySchedulePageLoaded,
  SecurityScheduleClearCommitMessage,
  SecuritySchedulePageRefreshed,
  SecurityScheduleClearPageSuccess,
} from '../actions/security.actions';
import {
  selectSecurityLastUpdated,
  selectSecuritySchedule,
  selectSecuritySettlementDate,
} from '../selectors/security.selectors';
import { IScheduleInProgress, IScheduleStatus } from '../../types';
import { AdminEffectsHelper } from './helper';

@Injectable()
export class SecurityEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecuritySchedulePageDestroyed>(SecuritySchedulePageDestroyed.Type),
      mergeMap((action) =>
        of(
          new SecurityScheduleClearPageError(),
          new SecurityScheduleClearPageSuccess(),
          new SecurityScheduleClearCommitMessage()
        )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecuritySchedulePageRefreshed>(SecuritySchedulePageRefreshed.Type),
      map((_) => new SecurityScheduleFetch())
    )
  );

  pageLoadedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecuritySchedulePageLoaded>(SecuritySchedulePageLoaded.Type),
      withLatestFrom(this.store.select(selectSecurityLastUpdated)),
      filter(([action, lastUpdated]) => !lastUpdated),
      map(([action, lastUpdated]) => new SecurityScheduleFetch())
    )
  );

  static INTERVAL_MS = 1000 * 60 * 5; // 5 mins
  fetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecurityScheduleFetch>(SecurityScheduleFetch.Type),
      mergeMap((action) =>
        timer(10, SecurityEffects.INTERVAL_MS).pipe(
          mergeMap(() =>
            this.service.current('SecuritiesSettlement').pipe(
              map(
                ({ status, schedule }) => {
                  let inProgressState: IScheduleInProgress = AdminEffectsHelper.checkForRunningJob(status);
                  return new SecurityScheduleFetchResult(inProgressState, schedule)
                }
              ),
              catchError((error) => of(new SecurityScheduleFetchError(error)))
            )
          )
        )
      )
    )
  );

  runEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecurityScheduleRun>(SecurityScheduleRun.Type),
      withLatestFrom(this.store.select(selectSecuritySettlementDate)),
      mergeMap(([action, settlementDate]) =>
        this.service.run('SecuritiesSettlement', settlementDate).pipe(
          map((message) => new SecurityScheduleRunResult(message)),
          catchError((error) => of(new SecurityScheduleRunError(error)))
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecurityScheduleSubmit>(SecurityScheduleSubmit.Type),
      mergeMap((action) =>
        this.service.submit('SecuritiesSettlement', action.schedule).pipe(
          map((schedule) => new SecurityScheduleSubmitResult(schedule)),
          catchError((error) => of(new SecurityScheduleSubmitError(error)))
        )
      )
    )
  );

  toggleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SecurityScheduleToggle>(SecurityScheduleToggle.Type),
      withLatestFrom(this.store.select(selectSecuritySchedule)),
      mergeMap(([action, schedule]) =>
        this.service
          .submit('SecuritiesSettlement', {
            ...schedule,
            status: action.checked ? 'ACTIVE' : 'INACTIVE',
          })
          .pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map((schedule) => new SecurityScheduleToggleResult(schedule)),
            catchError((error) => of(new SecurityScheduleToggleError(error)))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ScheduleService,
    private store: Store
  ) {}

}
