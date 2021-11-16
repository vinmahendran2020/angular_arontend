import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { CoreService } from 'ion-core';

import { RiskService } from '../../service/risk.service';

import {
  RiskClearPageError,
  RiskCollateralIdChange,
  RiskFormEnterKeyed,
  RiskPageDestroyed,
  RiskPageRefreshed,
  RiskParticipantIdChange,
  RiskParticipantIdError,
  RiskSummaryError,
  RiskSummaryServerError,
  RiskSummaryFound,
  RiskSummarySearch,
  RiskClearPageSuccess,
  RiskParticipantIdFound,
  RiskPageLoaded,
} from '../actions/risk.actions';
import {
  selectRiskCollateralId,
  selectRiskFormDisabled,
  selectRiskIsFirstLoad,
  selectRiskParticipantId,
  selectRiskParticipantIdError,
} from '../selectors/risk.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class RiskEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectRiskParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new RiskParticipantIdChange(action.current, /* triggerSearch */ true)
      )
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskPageLoaded>(RiskPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectRiskIsFirstLoad),
        this.store.select(selectRiskParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new RiskParticipantIdChange(participant, /* triggerSearch */ true)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskPageDestroyed>(RiskPageDestroyed.Type),
      mergeMap((action) =>
        of(new RiskClearPageError(), new RiskClearPageSuccess())
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskPageRefreshed>(RiskPageRefreshed.Type),
      withLatestFrom(this.store.select(selectRiskFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new RiskSummarySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskFormEnterKeyed>(RiskFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectRiskFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new RiskSummarySearch())
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskParticipantIdChange>(RiskParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectRiskParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          mergeMap((participant) =>
            of(
              new RiskParticipantIdFound(
                participant.partId,
                action.triggerSearch
              ),
              new RiskCollateralIdChange(
                participant.collGrpId,
                action.triggerSearch
              )
            )
          ),
          catchError((error) => of(new RiskParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskCollateralIdChange>(RiskCollateralIdChange.Type),
      filter((action) => action.triggerSearch),
      map((action) => new RiskPageRefreshed())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RiskSummarySearch>(RiskSummarySearch.Type),
      withLatestFrom(
        this.store.select(selectRiskParticipantId),
        this.store.select(selectRiskCollateralId)
      ),
      switchMap(([action, participantId, collateralId]) =>
        this.service.search(participantId, collateralId).pipe(
          map((summary) => new RiskSummaryFound(summary)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new RiskSummaryServerError(error.description));
            } else {
              return of(new RiskSummaryError(error));
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: RiskService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
