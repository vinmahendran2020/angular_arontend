import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { CoreService } from 'ion-core';

import {
  selectCurrentTab,
  selectFormDisabled,
  selectFormIsFirstLoad,
  selectFormParticipantId,
  selectFormParticipantIdError,
} from '../selectors/form.selectors';

import {
  MemoClearPageError,
  MemoClearPageSuccess,
  MemoResetForm,
  MemoSummarySearch,
} from '../actions/memo.actions';
import {
  SettlementClearPageError,
  SettlementClearPageSuccess,
  SettlementCurrentTabRefresh,
} from '../actions/settlement.actions';
import {
  FormBeginReset,
  FormFormEnterKeyed,
  FormPageLoaded,
  FormPageRefreshed,
  FormParticipantIdChange,
  FormParticipantIdError,
  FormParticipantIdFound,
  FormResetForm,
  FormSummarySearch,
  FormTransactionTypeChange,
} from '../actions/form.actions';
import { selectShellParticipant } from '../selectors/shell.selectors';
import { of } from 'rxjs';
import {
  MovementClearPageError,
  MovementClearPageSuccess,
  MovementResetForm,
  MovementSummarySearch,
} from '../actions/movement.actions';
import {
  CashClearPageError,
  CashClearPageSuccess,
  CashResetForm,
  CashSummarySearch,
} from '../actions/cash.actions';
import {
  OrderClearPageError,
  OrderClearPageSuccess,
  OrderResetForm,
  OrderSummarySearch,
} from '../actions/order.actions';
import {
  ObligationClearPageError,
  ObligationClearPageSuccess,
  ObligationResetForm,
  ObligationSummarySearch,
} from '../actions/obligation.actions';
import {
  AdjustmentClearPageError,
  AdjustmentClearPageSuccess,
  AdjustmentResetForm,
  AdjustmentSummarySearch,
} from '../actions/adjustment.actions';
import {
  PrepositionClearPageError,
  PrepositionClearPageSuccess,
  PrepositionResetForm,
  PrepositionSummarySearch,
} from '../actions/preposition.actions';
import { selectIsFirstLoad } from '../selectors/settlement.selectors';

@Injectable()
export class SettlementEffects {
  shellParticipantSwitchedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<{
        type: 'Shell/ParticipantSwitched';
        current: string;
        previous: string;
      }>('Shell/ParticipantSwitched'),
      withLatestFrom(this.store.select(selectFormParticipantId)),
      filter(
        ([action, participantId]) =>
          !participantId || action.previous === participantId
      ),
      map(
        ([action]) =>
          new FormParticipantIdChange(action.current, /* triggerSearch */ true)
      )
    )
  );

  shellRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/CurrentPageRefresh'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([_, currentTab]) => currentTab !== 'none'),
      map(([_, currentTab]) => new SettlementCurrentTabRefresh(currentTab))
    )
  );

  shellClearErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageError'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new SettlementClearPageError(currentTab))
    )
  );

  shellClearSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Shell/ClearPageSuccess'),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, currentTab]) => new SettlementClearPageSuccess(currentTab))
    )
  );

  settlementRefreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SettlementCurrentTabRefresh>(SettlementCurrentTabRefresh.Type),
      map(({ tab }) => new FormPageRefreshed())
    )
  );

  pageFirstLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormPageLoaded>(FormPageLoaded.Type),
      withLatestFrom(
        this.store.select(selectFormIsFirstLoad),
        this.store.select(selectFormParticipantId),
        this.store.select(selectShellParticipant)
      ),
      filter(
        ([_, firstLoad, participantId, participant]) =>
          firstLoad && participantId !== participant
      ),
      map(
        ([_, __, ___, participant]) =>
          new FormParticipantIdChange(participant, /* triggerSearch */ true)
      )
    )
  );

  participantIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormParticipantIdChange>(FormParticipantIdChange.Type),
      withLatestFrom(this.store.select(selectFormParticipantIdError)),
      filter(([_, participantIdError]) => !participantIdError),
      switchMap(([action]) =>
        this.coreService.getParticipant(action.participantId).pipe(
          map(
            (participant) =>
              new FormParticipantIdFound(
                participant.partId,
                action.triggerSearch
              )
          ),
          catchError((error) => of(new FormParticipantIdError(error)))
        )
      )
    )
  );

  participantIdChangeSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormParticipantIdFound>(FormParticipantIdFound.Type),
      filter((action) => action.triggerSearch),
      map((action) => new FormPageRefreshed())
    )
  );

  participantIdChageOnTransactionTypeChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormTransactionTypeChange>(FormTransactionTypeChange.Type),
      withLatestFrom(
        this.store.select(selectFormParticipantId),
        this.store.select(selectIsFirstLoad)
      ),
      map(
        ([action, participantId, firstLoad]) =>
          new FormParticipantIdChange(
            participantId,
            /* triggerSearch */ firstLoad
          )
      )
    )
  );

  pageRefreshedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormPageRefreshed>(FormPageRefreshed.Type),
      withLatestFrom(this.store.select(selectFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new FormSummarySearch('refreshed'))
    )
  );

  formEnteredEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormFormEnterKeyed>(FormFormEnterKeyed.Type),
      withLatestFrom(this.store.select(selectFormDisabled)),
      filter(([_, formDisabled]) => !formDisabled),
      map((_) => new FormSummarySearch('entered'))
    )
  );

  settlementClearPageErrorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SettlementClearPageError>(SettlementClearPageError.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashClearPageError();
        } else if (tab === 'memo') {
          return new MemoClearPageError();
        } else if (tab === 'order') {
          return new OrderClearPageError();
        } else if (tab === 'movement') {
          return new MovementClearPageError();
        } else if (tab === 'obligation') {
          return new ObligationClearPageError();
        } else if (tab === 'adjustment') {
          return new AdjustmentClearPageError();
        } else if (tab === 'preposition') {
          return new PrepositionClearPageError();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  settlementClearPageSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SettlementClearPageSuccess>(SettlementClearPageSuccess.Type),
      map(({ tab }) => {
        if (tab === 'cash') {
          return new CashClearPageSuccess();
        } else if (tab === 'memo') {
          return new MemoClearPageSuccess();
        } else if (tab === 'order') {
          return new OrderClearPageSuccess();
        } else if (tab === 'movement') {
          return new MovementClearPageSuccess();
        } else if (tab === 'obligation') {
          return new ObligationClearPageSuccess();
        } else if (tab === 'adjustment') {
          return new AdjustmentClearPageSuccess();
        } else if (tab === 'preposition') {
          return new PrepositionClearPageSuccess();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  formSearchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormSummarySearch>(FormSummarySearch.Type),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, tab]) => {
        if (tab === 'cash') {
          return new CashSummarySearch();
        } else if (tab === 'memo') {
          return new MemoSummarySearch();
        } else if (tab === 'order') {
          return new OrderSummarySearch();
        } else if (tab === 'movement') {
          return new MovementSummarySearch();
        } else if (tab === 'obligation') {
          return new ObligationSummarySearch();
        } else if (tab === 'adjustment') {
          return new AdjustmentSummarySearch();
        } else if (tab === 'preposition') {
          return new PrepositionSummarySearch();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  formBeginResetEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormBeginReset>(FormBeginReset.Type),
      withLatestFrom(this.store.select(selectCurrentTab)),
      filter(([action, currentTab]) => currentTab !== 'none'),
      map(([action, tab]) => {
        if (tab === 'cash') {
          return new CashResetForm();
        } else if (tab === 'memo') {
          return new MemoResetForm();
        } else if (tab === 'order') {
          return new OrderResetForm();
        } else if (tab === 'movement') {
          return new MovementResetForm();
        } else if (tab === 'obligation') {
          return new ObligationResetForm();
        } else if (tab === 'adjustment') {
          return new AdjustmentResetForm();
        } else if (tab === 'preposition') {
          return new PrepositionResetForm();
        }
        return { type: 'none' };
      }),
      filter((action) => action.type !== 'none')
    )
  );

  formResetEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FormBeginReset>(FormBeginReset.Type),
      map((action) => new FormResetForm())
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private coreService: CoreService
  ) {}
}
