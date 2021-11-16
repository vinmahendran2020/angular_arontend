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
import { IScheduleInProgress, IScheduleStatus } from '../../types';


import {
  EndScheduleFetch,
  EndScheduleFetchResult,
  EndScheduleFetchError,
  EndScheduleRun,
  EndScheduleRunResult,
  EndScheduleRunError,
  EndScheduleSubmit,
  EndScheduleSubmitResult,
  EndScheduleSubmitError,
  EndScheduleToggleError,
  EndScheduleToggleResult,
  EndScheduleToggle,
  EndSchedulePageDestroyed,
  EndScheduleClearPageError,
  EndSchedulePageLoaded,
  EndScheduleClearCommitMessage,
  EndSchedulePageRefreshed,
  EndScheduleClearPageSuccess,
} from '../actions/end.actions';
import {
  selectEndLastUpdated,
  selectEndSchedule,
  selectEndSettlementDate,
} from '../selectors/end.selectors';
import { AdminEffectsHelper } from './helper';

@Injectable()
export class EndEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndSchedulePageDestroyed>(EndSchedulePageDestroyed.Type),
      mergeMap((action) =>
        of(
          new EndScheduleClearPageError(),
          new EndScheduleClearPageSuccess(),
          new EndScheduleClearCommitMessage()
        )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndSchedulePageRefreshed>(EndSchedulePageRefreshed.Type),
      map((_) => new EndScheduleFetch())
    )
  );

  pageLoadedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndSchedulePageLoaded>(EndSchedulePageLoaded.Type),
      withLatestFrom(this.store.select(selectEndLastUpdated)),
      filter(([action, lastUpdated]) => !lastUpdated),
      map(([action, lastUpdated]) => new EndScheduleFetch())
    )
  );

  static INTERVAL_MS = 1000 * 60 * 5; // 5 mins
  fetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndScheduleFetch>(EndScheduleFetch.Type),
      mergeMap((action) =>
        timer(10, EndEffects.INTERVAL_MS).pipe(
          mergeMap(() =>
            this.service.current('EndOfDay').pipe(
              map(
                ({ status, schedule }) => {
                  let inProgressState: IScheduleInProgress = AdminEffectsHelper.checkForRunningJob(status);
                  return new EndScheduleFetchResult(inProgressState, schedule)
                }
              ),
              catchError((error) => of(new EndScheduleFetchError(error)))
            )
          )
        )
      )
    )
  );
    
  runEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndScheduleRun>(EndScheduleRun.Type),
      withLatestFrom(this.store.select(selectEndSettlementDate)),
      mergeMap(([action, settlementDate]) =>
        this.service.run('EndOfDay', settlementDate).pipe(
          map((message) => new EndScheduleRunResult(message)),
          catchError((error) => of(new EndScheduleRunError(error)))
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndScheduleSubmit>(EndScheduleSubmit.Type),
      mergeMap((action) =>
        this.service.submit('EndOfDay', action.schedule).pipe(
          map((schedule) => new EndScheduleSubmitResult(schedule)),
          catchError((error) => of(new EndScheduleSubmitError(error)))
        )
      )
    )
  );

  toggleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<EndScheduleToggle>(EndScheduleToggle.Type),
      withLatestFrom(this.store.select(selectEndSchedule)),
      mergeMap(([action, schedule]) =>
        this.service
          .submit('EndOfDay', {
            ...schedule,
            status: action.checked ? 'ACTIVE' : 'INACTIVE',
          })
          .pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map((schedule) => new EndScheduleToggleResult(schedule)),
            catchError((error) => of(new EndScheduleToggleError(error)))
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
