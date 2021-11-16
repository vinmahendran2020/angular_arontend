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
  NettingScheduleFetch,
  NettingScheduleFetchResult,
  NettingScheduleFetchError,
  NettingScheduleRun,
  NettingScheduleRunResult,
  NettingScheduleRunError,
  NettingScheduleSubmit,
  NettingScheduleSubmitResult,
  NettingScheduleSubmitError,
  NettingScheduleToggleError,
  NettingScheduleToggleResult,
  NettingScheduleToggle,
  NettingScheduleClearPageError,
  NettingSchedulePageDestroyed,
  NettingSchedulePageLoaded,
  NettingScheduleClearCommitMessage,
  NettingSchedulePageRefreshed,
  NettingScheduleClearPageSuccess,
} from '../actions/netting.actions';
import {
  selectNettingLastUpdated,
  selectNettingSchedule,
} from '../selectors/netting.selectors';
import { IScheduleInProgress, IScheduleStatus } from '../../types';
import { AdminEffectsHelper } from './helper';

@Injectable()
export class NettingEffects {
  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingSchedulePageDestroyed>(NettingSchedulePageDestroyed.Type),
      mergeMap((action) =>
        of(
          new NettingScheduleClearPageError(),
          new NettingScheduleClearPageSuccess(),
          new NettingScheduleClearCommitMessage()
        )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingSchedulePageRefreshed>(NettingSchedulePageRefreshed.Type),
      map((_) => new NettingScheduleFetch())
    )
  );

  pageLoadedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingSchedulePageLoaded>(NettingSchedulePageLoaded.Type),
      withLatestFrom(this.store.select(selectNettingLastUpdated)),
      filter(([action, lastUpdated]) => !lastUpdated),
      map(([action, lastUpdated]) => new NettingScheduleFetch())
    )
  );

  static INTERVAL_MS = 1000 * 60 * 5; // 5 mins
  fetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingScheduleFetch>(NettingScheduleFetch.Type),
      mergeMap((action) =>
        timer(10, NettingEffects.INTERVAL_MS).pipe(
          mergeMap(() =>
            this.service.current('Netting').pipe(
              map(
                ({ status, schedule }) => {
                  let inProgressState: IScheduleInProgress = AdminEffectsHelper.checkForRunningJob(status);
                  return new NettingScheduleFetchResult(inProgressState, schedule)
                }
              ),
              catchError((error) => of(new NettingScheduleFetchError(error)))
            )
          )
        )
      )
    )
  );

  runEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingScheduleRun>(NettingScheduleRun.Type),
      mergeMap((action) =>
        this.service.run('Netting').pipe(
          map((message) => new NettingScheduleRunResult(message)),
          catchError((error) => of(new NettingScheduleRunError(error)))
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingScheduleSubmit>(NettingScheduleSubmit.Type),
      mergeMap((action) =>
        this.service.submit('Netting', action.schedule).pipe(
          map((schedule) => new NettingScheduleSubmitResult(schedule)),
          catchError((error) => of(new NettingScheduleSubmitError(error)))
        )
      )
    )
  );

  toggleEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<NettingScheduleToggle>(NettingScheduleToggle.Type),
      withLatestFrom(this.store.select(selectNettingSchedule)),
      mergeMap(([action, schedule]) =>
        this.service
          .submit('Netting', {
            ...schedule,
            status: action.checked ? 'ACTIVE' : 'INACTIVE',
          })
          .pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map((schedule) => new NettingScheduleToggleResult(schedule)),
            catchError((error) => of(new NettingScheduleToggleError(error)))
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
