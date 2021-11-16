import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';

import { CoreService } from 'ion-core';

import { MemoService } from '../../service/memo.service';

import {
  MemoClearPageError,
  MemoPageDestroyed,
  MemoPageRefreshed,
  MemoParticipantIdChange,
  MemoParticipantIdFound,
  MemoParticipantIdError,
  MemoCusipChangeForId,
  MemoCusipFoundForId,
  MemoCusipErrorForId,
  MemoSubmit,
  MemoSubmitSuccess,
  MemoSubmitError,
  MemoSubmitFailure,
  MemoClearPageSuccess,
  MemoCusipBalanceFoundForId,
  MemoCusipBalanceErrorForId,
  MemoPageLoaded,
} from '../actions/memo.actions';
import {
  selectMemoCusipErrorForId,
  selectMemoCusipForId,
  selectMemoIsFirstLoad,
  selectMemoParticipantId,
  selectMemoParticipantIdError,
  selectSubmitMemos,
} from '../selectors/memo.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class MemoEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectMemoParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(([action]) => new MemoParticipantIdChange(action.current))
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoPageLoaded>(MemoPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectMemoIsFirstLoad),
        this.store.select(selectMemoParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) => new MemoParticipantIdChange(participant)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoPageDestroyed>(MemoPageDestroyed.Type),
      mergeMap((action) =>
        of(new MemoClearPageError(), new MemoClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoParticipantIdChange>(MemoParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectMemoParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map((participant) => new MemoParticipantIdFound(participant.partId)),
          catchError((error) => of(new MemoParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoParticipantIdFound>(MemoParticipantIdFound.Type),
      map((action) => new MemoPageRefreshed())
    )
  );

  cusipIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoCusipChangeForId>(MemoCusipChangeForId.Type),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectMemoCusipForId, action.id),
            this.store.select(selectMemoCusipErrorForId, action.id)
          ),
          filter(([_, __, cusipIdError]) => !cusipIdError),
          switchMap(([caction, cusipId]) =>
            this.coreService.getCusip(cusipId).pipe(
              map((cusip) => new MemoCusipFoundForId(caction.id, cusip.cusip)),
              catchError((error) =>
                of(new MemoCusipErrorForId(caction.id, error))
              )
            )
          )
        )
      )
    )
  );

  cusipBalanceEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoCusipFoundForId>(MemoCusipFoundForId.Type),
      withLatestFrom(
        this.store.select(selectMemoParticipantId),
        this.store.select(selectMemoParticipantIdError)
      ),
      filter(([_, __, participantIdError]) => !participantIdError),
      switchMap(([action, participantId]) =>
        this.service.balance(participantId, action.cusip).pipe(
          map(
            (balance) =>
              new MemoCusipBalanceFoundForId(
                action.id,
                balance.participantId,
                balance.cusipId,
                balance.cusipName,
                balance.memoSegregation,
                balance.totalFreeExcess,
                balance.totalPositions
              )
          ),
          catchError((error) =>
            of(new MemoCusipBalanceErrorForId(action.id, error))
          )
        )
      )
    )
  );

  memoSubmitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<MemoSubmit>(MemoSubmit.Type),
      withLatestFrom(
        this.store.select(selectMemoParticipantId),
        this.store.select(selectSubmitMemos)
      ),
      switchMap(([action, participantId, memos]) =>
        this.service.submit(participantId, memos).pipe(
          mergeMap((results) => {
            const actions: Array<MemoSubmitSuccess | MemoSubmitFailure> = [];
            const successes = results
              .filter((x) => x.status === 200)
              .map((x) => x.rowNo);
            const failures = results
              .filter((x) => x.status !== 200)
              .map((x) => x.rowNo);
            if (successes.length) {
              actions.push(new MemoSubmitSuccess(successes));
            }
            if (failures.length) {
              actions.push(new MemoSubmitFailure(failures));
            }
            return of(...actions);
          }),
          catchError((error) =>
            of(new MemoSubmitError(error.description || error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: MemoService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
