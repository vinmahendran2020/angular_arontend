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
  CashScheduleFetch,
  CashScheduleFetchResult,
  CashScheduleFetchError,
  CashScheduleRun,
  CashScheduleRunResult,
  CashScheduleRunError,
  CashScheduleSubmit,
  CashScheduleSubmitResult,
  CashScheduleSubmitError,
  CashScheduleToggleError,
  CashScheduleToggleResult,
  CashScheduleToggle,
  CashSchedulePageDestroyed,
  CashScheduleClearPageError,
  CashSchedulePageLoaded,
  CashScheduleClearCommitMessage,
  CashSchedulePageRefreshed,
  CashScheduleClearPageSuccess,
} from '../actions/cash.actions';
import {
  selectCashLastUpdated,
  selectCashSchedule,
  selectCashSettlementDate,
} from '../selectors/cash.selectors';

import { IScheduleInProgress, IScheduleStatus } from '../../types';
import { AdminEffectsHelper } from './helper';

@Injectable()
export class CashEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashSchedulePageDestroyed>(CashSchedulePageDestroyed.Type),
      mergeMap((action) =>
        of(
          new CashScheduleClearPageError(),
          new CashScheduleClearPageSuccess(),
          new CashScheduleClearCommitMessage()
        )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashSchedulePageRefreshed>(CashSchedulePageRefreshed.Type),
      map((_) => new CashScheduleFetch())
    )
  );

  pageLoadedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashSchedulePageLoaded>(CashSchedulePageLoaded.Type),
      withLatestFrom(this.store.select(selectCashLastUpdated)),
      filter(([action, lastUpdated]) => !lastUpdated),
      map(([action, lastUpdated]) => new CashScheduleFetch())
    )
  );

  static INTERVAL_MS = 1000 * 60 * 5; // 5 mins
  fetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashScheduleFetch>(CashScheduleFetch.Type),
      mergeMap((action) =>
        timer(10, CashEffects.INTERVAL_MS).pipe(
          mergeMap(() =>
            this.service.current('Cash').pipe(
              map(
                ({ status, schedule }) => {
                  let inProgressState: IScheduleInProgress = AdminEffectsHelper.checkForRunningJob(status);
                  return new CashScheduleFetchResult(inProgressState, schedule)
                }
              ),
              catchError((error) => of(new CashScheduleFetchError(error)))
            )
          )
        )
      )
    )
  );

  runEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashScheduleRun>(CashScheduleRun.Type),
      withLatestFrom(this.store.select(selectCashSettlementDate)),
      mergeMap(([action, settlementDate]) =>
        this.service.run('Cash', settlementDate).pipe(
          map((message) => new CashScheduleRunResult(message)),
          catchError((error) => of(new CashScheduleRunError(error)))
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashScheduleSubmit>(CashScheduleSubmit.Type),
      mergeMap((action) =>
        this.service.submit('Cash', action.schedule).pipe(
          map((schedule) => new CashScheduleSubmitResult(schedule)),
          catchError((error) => of(new CashScheduleSubmitError(error)))
        )
      )
    )
  );

  toggleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CashScheduleToggle>(CashScheduleToggle.Type),
      withLatestFrom(this.store.select(selectCashSchedule)),
      mergeMap(([action, schedule]) =>
        this.service
          .submit('Cash', {
            ...schedule,
            status: action.checked ? 'ACTIVE' : 'INACTIVE',
          })
          .pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map((schedule) => new CashScheduleToggleResult(schedule)),
            catchError((error) => of(new CashScheduleToggleError(error)))
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
