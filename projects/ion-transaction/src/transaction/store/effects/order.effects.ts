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

import { OrderService } from '../../service/order.service';

import {
  OrderClearPageError,
  OrderPageDestroyed,
  OrderParticipantIdChange,
  OrderParticipantIdFound,
  OrderParticipantIdError,
  OrderReceiverChangeForId,
  OrderReceiverFoundForId,
  OrderReceiverErrorForId,
  OrderCusipChangeForId,
  OrderCusipFoundForId,
  OrderCusipErrorForId,
  OrderSubmit,
  OrderSubmitSuccess,
  OrderSubmitError,
  OrderSubmitFailure,
  OrderClearPageSuccess,
  OrderPageLoaded,
} from '../actions/order.actions';
import {
  selectOrderCusipErrorForId,
  selectOrderCusipForId,
  selectOrderIsFirstLoad,
  selectOrderParticipantId,
  selectOrderParticipantIdError,
  selectOrderReceiverErrorForId,
  selectOrderReceiverForId,
  selectSubmitOrders,
} from '../selectors/order.selectors';
import { selectShellParticipant } from '../selectors/shell.selectors';

@Injectable()
export class OrderEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectOrderParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(([action]) => new OrderParticipantIdChange(action.current))
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderPageLoaded>(OrderPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectOrderIsFirstLoad),
        this.store.select(selectOrderParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) => new OrderParticipantIdChange(participant)
      )
    )
  );

  pageDestroyedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderPageDestroyed>(OrderPageDestroyed.Type),
      mergeMap((action) =>
        of(new OrderClearPageError(), new OrderClearPageSuccess())
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderParticipantIdChange>(OrderParticipantIdChange.Type),
      withLatestFrom(
        this.store.select(selectOrderParticipantIdError)
      ),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map((participant) => new OrderParticipantIdFound(participant.partId)),
          catchError((error) => of(new OrderParticipantIdError(error)))
        )
      )
    )
  );

  receiverIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderReceiverChangeForId>(OrderReceiverChangeForId.Type),
      filter((action) => !!action.receiver),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectOrderReceiverForId, action.id),
            this.store.select(selectOrderReceiverErrorForId, action.id)
          ),
          filter(([_, __, receiverIdError]) => !receiverIdError),
          switchMap(([caction, receiverId]) =>
            this.coreService
              .getParticipant(
                receiverId,
                'No information found for Receiver ID'
              )
              .pipe(
                map(
                  (receiver) =>
                    new OrderReceiverFoundForId(caction.id, receiver.partId)
                ),
                catchError((error) =>
                  of(new OrderReceiverErrorForId(caction.id, error))
                )
              )
          )
        )
      )
    )
  );

  cusipIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderCusipChangeForId>(OrderCusipChangeForId.Type),
      switchMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.select(selectOrderCusipForId, action.id),
            this.store.select(selectOrderCusipErrorForId, action.id)
          ),
          filter(([_, __, cusipIdError]) => !cusipIdError),
          switchMap(([caction, cusipId]) =>
            this.coreService.getCusip(cusipId).pipe(
              map((cusip) => new OrderCusipFoundForId(caction.id, cusip.cusip)),
              catchError((error) =>
                of(new OrderCusipErrorForId(caction.id, error))
              )
            )
          )
        )
      )
    )
  );

  submitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<OrderSubmit>(OrderSubmit.Type),
      withLatestFrom(
        this.store.select(selectOrderParticipantId),
        this.store.select(selectSubmitOrders)
      ),
      switchMap(([action, participantId, orders]) =>
        this.service.submit(participantId, orders).pipe(
          mergeMap((results) => {
            const actions: Array<OrderSubmitSuccess | OrderSubmitFailure> = [];
            const successes = results
              .filter((x) => x.status === 200)
              .map((x) => x.rowNo);
            const failures = results
              .filter((x) => x.status !== 200)
              .map((x) => x.rowNo);
            if (successes.length) {
              actions.push(new OrderSubmitSuccess(successes));
            }
            if (failures.length) {
              actions.push(new OrderSubmitFailure(failures));
            }
            return of(...actions);
          }),
          catchError((error) =>
            of(new OrderSubmitError(error.description || error))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: OrderService,
    private store: Store,
    private coreService: CoreService
  ) {}
}
