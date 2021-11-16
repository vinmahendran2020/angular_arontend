import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { ShellService } from '../../service/shell.service';

import {
  ScheduleIntervalFetch,
  ScheduleIntervalFetchResult,
  ScheduleIntervalFetchError,
  ShellParticipantChanged,
  ShellParticipantSwitched,
} from '../actions/shell.actions';
import { selectParticipant } from '../selectors/shell.selectors';

import { Logout } from 'ion-core';

@Injectable()
export class ShellEffects {
  static INTERVAL_MS = 1000 * 60 * 5; // 5 mins

  fetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ScheduleIntervalFetch>(ScheduleIntervalFetch.Type),
      mergeMap((action) =>
        timer(10, ShellEffects.INTERVAL_MS).pipe(
          takeUntil(this.actions$.pipe(ofType<Logout>(Logout.Type))),
          mergeMap(() =>
            this.service.intervals().pipe(
              map((schedule) => new ScheduleIntervalFetchResult(schedule)),
              catchError((error) => of(new ScheduleIntervalFetchError(error)))
            )
          )
        )
      )
    )
  );

  participantChangedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ShellParticipantChanged>(ShellParticipantChanged.Type),
      withLatestFrom(this.store.select(selectParticipant)),
      map(
        ([action, participant]) =>
          new ShellParticipantSwitched(action.participant, participant)
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: ShellService,
    private store: Store
  ) {}
}
