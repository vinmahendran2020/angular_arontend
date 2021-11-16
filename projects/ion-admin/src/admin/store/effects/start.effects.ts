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
  StartScheduleFetch,
  StartScheduleFetchResult,
  StartScheduleFetchError,
  StartScheduleRun,
  StartScheduleRunResult,
  StartScheduleRunError,
  StartScheduleSubmit,
  StartScheduleSubmitResult,
  StartScheduleSubmitError,
  StartScheduleToggleError,
  StartScheduleToggleResult,
  StartScheduleToggle,
  StartSchedulePageDestroyed,
  StartScheduleClearPageError,
  StartSchedulePageLoaded,
  StartScheduleClearCommitMessage,
  StartSchedulePageRefreshed,
  StartScheduleClearPageSuccess,
} from '../actions/start.actions';
import {
  selectStartLastUpdated,
  selectStartSchedule,
  selectStartSettlementDate,
} from '../selectors/start.selectors';
import { AdminEffectsHelper } from './helper';

@Injectable()
export class StartEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<StartSchedulePageDestroyed>(StartSchedulePageDestroyed.Type),
      mergeMap((action) =>
        of(
          new StartScheduleClearPageError(),
          new StartScheduleClearPageSuccess(),
          new StartScheduleClearCommitMessage()
        )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<StartSchedulePageRefreshed>(StartSchedulePageRefreshed.Type),
      map((_) => new StartScheduleFetch())
    )
  );

  pageLoadedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<StartSchedulePageLoaded>(StartSchedulePageLoaded.Type),
      withLatestFrom(this.store.select(selectStartLastUpdated)),
      filter(([action, lastUpdated]) => !lastUpdated),
      map(([action, lastUpdated]) => new StartScheduleFetch())
    )
  );

  static INTERVAL_MS = 1000 * 60 * 5; // 5 mins
  fetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<StartScheduleFetch>(StartScheduleFetch.Type),
      mergeMap((action) =>
        timer(10, StartEffects.INTERVAL_MS).pipe(
          mergeMap(() =>
            this.service.current('StartOfDay').pipe(
              map(
                ({ status, schedule }) => {
                  let inProgressState: IScheduleInProgress = AdminEffectsHelper.checkForRunningJob(status);
                  return new StartScheduleFetchResult(inProgressState, schedule)
                }
              ),
              catchError((error) => of(new StartScheduleFetchError(error)))
            )
          )
        )
      )
    )
  );

  runEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType<StartScheduleRun>(StartScheduleRun.Type),
    mergeMap((action) =>
      this.service.run('StartOfDay').pipe(
        map((message) => new StartScheduleRunResult(message)),
        catchError((error) => of(new StartScheduleRunError(error)))
      )
    )
  )
);

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<StartScheduleSubmit>(StartScheduleSubmit.Type),
      mergeMap((action) =>
        this.service.submit('StartOfDay', action.schedule).pipe(
          map((schedule) => new StartScheduleSubmitResult(schedule)),
          catchError((error) => of(new StartScheduleSubmitError(error)))
        )
      )
    )
  );

  toggleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<StartScheduleToggle>(StartScheduleToggle.Type),
      withLatestFrom(this.store.select(selectStartSchedule)),
      mergeMap(([action, schedule]) =>
        this.service
          .submit('StartOfDay', {
            ...schedule,
            status: action.checked ? 'ACTIVE' : 'INACTIVE',
          })
          .pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map((schedule) => new StartScheduleToggleResult(schedule)),
            catchError((error) => of(new StartScheduleToggleError(error)))
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
