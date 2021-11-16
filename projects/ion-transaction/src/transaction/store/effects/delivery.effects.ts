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

import { DeliveryService } from '../../service/delivery.service';

import {
  DeliveryClearPageError,
  DeliveryFormEnterKeyed,
  DeliveryPageDestroyed,
  DeliveryPageRefreshed,
  DeliverySearchError,
  DeliverySearchServerError,
  DeliverySearchFound,
  DeliverySearch,
  DeliveryParticipantIdChange,
  DeliveryParticipantIdError,
  DeliveryParticipantIdFound,
  DeliveryClearPageSuccess,
  DeliveryPageLoaded,
  DeliverySubmit,
  DeliverySubmitSuccess,
  DeliverySubmitError,
  DeliverySubmitFailure,
} from '../actions/delivery.actions';
import {
  selectDeliveryFormDisabled,
  selectDeliveryParticipantId,
  selectDeliveryIsFirstLoad,
  selectSummitDeliveries,
  selectDeliveryParticipantIdError,
} from '../selectors/delivery.selectors';

import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class DeliveryEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectDeliveryParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new DeliveryParticipantIdChange(
            action.current,
            /* triggerSearch */ true
          )
      )
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliveryPageLoaded>(DeliveryPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectDeliveryIsFirstLoad),
        this.store.select(selectDeliveryParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new DeliveryParticipantIdChange(participant, /* triggerSearch */ true)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliveryPageDestroyed>(DeliveryPageDestroyed.Type),
      mergeMap((action) =>
        of(new DeliveryClearPageError(), new DeliveryClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliveryParticipantIdChange>(DeliveryParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectDeliveryParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new DeliveryParticipantIdFound(
                participant.partId,
                action.triggerSearch
              )
          ),
          catchError((error) => of(new DeliveryParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliveryParticipantIdFound>(DeliveryParticipantIdFound.Type),
      filter((action) => action.triggerSearch),
      map((action) => new DeliveryPageRefreshed())
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliveryPageRefreshed>(DeliveryPageRefreshed.Type),
      withLatestFrom(this.store.select(selectDeliveryFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new DeliverySearch())
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliveryFormEnterKeyed>(DeliveryFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectDeliveryFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new DeliverySearch())
    )
  );

  searchSummaryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliverySearch>(DeliverySearch.Type),
      withLatestFrom(this.store.select(selectDeliveryParticipantId)),
      switchMap(([action, participantId]) =>
        this.service.search(participantId).pipe(
          map((deliveries) => new DeliverySearchFound(deliveries)),
          catchError((error) => {
            if (error.code === 500) {
              return of(new DeliverySearchServerError(error.description));
            } else {
              return of(new DeliverySearchError(error));
            }
          })
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeliverySubmit>(DeliverySubmit.Type),
      withLatestFrom(
        this.store.select(selectDeliveryParticipantId),
        this.store.select(selectSummitDeliveries)
      ),
      switchMap(([action, participantId, deliveries]) =>
        this.service.submit(participantId, deliveries).pipe(
          mergeMap((results) => {
            const actions: Array<
              DeliverySubmitSuccess | DeliverySubmitFailure
            > = [];
            const successes = results
              .filter((x) => x.status === 200)
              .map((x) => x.id);
            const failures = results
              .filter((x) => x.status !== 200)
              .map((x) => x.id);
            if (successes.length) {
              actions.push(new DeliverySubmitSuccess(successes));
            }
            if (failures.length) {
              actions.push(new DeliverySubmitFailure(failures));
            }
            return of(...actions);
          }),
          catchError((error) =>
            of(new DeliverySubmitError(error.description || error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: DeliveryService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
