import { Action } from '@ngrx/store';

export class OrderPageLoaded implements Action {
  static Type = 'Transaction/Order/PageLoaded' as const;
  readonly type = OrderPageLoaded.Type;
}

export class OrderPageRefreshed implements Action {
  static Type = 'Transaction/Order/PageRefreshed' as const;
  readonly type = OrderPageRefreshed.Type;
}

export class OrderPageDestroyed implements Action {
  static Type = 'Transaction/Order/PageDestroyed' as const;
  readonly type = OrderPageDestroyed.Type;
}

export class OrderClearPageError implements Action {
  static Type = 'Transaction/Order/ClearPageError' as const;
  readonly type = OrderClearPageError.Type;
}

export class OrderClearPageSuccess implements Action {
  static Type = 'Transaction/Order/ClearPageSuccess' as const;
  readonly type = OrderClearPageSuccess.Type;
}

export class OrderParticipantIdChange implements Action {
  static Type = 'Transaction/Order/ParticipantIdChange' as const;
  readonly type = OrderParticipantIdChange.Type;
  constructor(public participantId: string) {}
}

export class OrderParticipantIdFound implements Action {
  static Type = 'Transaction/Order/ParticipantIdFound' as const;
  readonly type = OrderParticipantIdFound.Type;
  constructor(public participantId: string) {}
}

export class OrderParticipantIdError implements Action {
  static Type = 'Transaction/Order/ParticipantIdError' as const;
  readonly type = OrderParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class OrderFormEnterKeyed implements Action {
  static Type = 'Transaction/Order/FormEnterKeyed' as const;
  readonly type = OrderFormEnterKeyed.Type;
}

export class OrderSubmit implements Action {
  static Type = 'Transaction/Order/Submit' as const;
  readonly type = OrderSubmit.Type;
}

export class OrderSubmitSuccess implements Action {
  static Type = 'Transaction/Order/SubmitSuccess' as const;
  readonly type = OrderSubmitSuccess.Type;
  constructor(public ids: number[]) {}
}

export class OrderSubmitFailure implements Action {
  static Type = 'Transaction/Order/SubmitFailure' as const;
  readonly type = OrderSubmitFailure.Type;
  constructor(public ids: number[]) {}
}

export class OrderSubmitError implements Action {
  static Type = 'Transaction/Order/SubmitError' as const;
  readonly type = OrderSubmitError.Type;
  constructor(public error: string) {}
}

export class OrderResetSummary implements Action {
  static Type = 'Transaction/Order/ResetSummary' as const;
  readonly type = OrderResetSummary.Type;
}

export class OrderAddNewRow implements Action {
  static Type = 'Transaction/Order/AddNewRow' as const;
  readonly type = OrderAddNewRow.Type;
}

export class OrderCloneRowById implements Action {
  static Type = 'Transaction/Order/CloneRowById' as const;
  readonly type = OrderCloneRowById.Type;
  constructor(public id: number) {}
}

export class OrderRemoveRowById implements Action {
  static Type = 'Transaction/Order/RemoveRowById' as const;
  readonly type = OrderRemoveRowById.Type;
  constructor(public id: number) {}
}

export class OrderReceiverFoundForId implements Action {
  static Type = 'Transaction/Order/ReceiverFoundForId' as const;
  readonly type = OrderReceiverFoundForId.Type;
  constructor(public id: number, public receiver: string) {}
}

export class OrderReceiverErrorForId implements Action {
  static Type = 'Transaction/Order/ReceiverErrorForId' as const;
  readonly type = OrderReceiverErrorForId.Type;
  constructor(public id: number, public receiverError: string) {}
}

export class OrderReceiverChangeForId implements Action {
  static Type = 'Transaction/Order/ReceiverIdChangeForId' as const;
  readonly type = OrderReceiverChangeForId.Type;
  constructor(public id: number, public receiver: string) {}
}

export class OrderAmountChangeForId implements Action {
  static Type = 'Transaction/Order/AmountChangeForId' as const;
  readonly type = OrderAmountChangeForId.Type;
  constructor(public id: number, public amount: string) {}
}

export class OrderQuantityChangeForId implements Action {
  static Type = 'Transaction/Order/QuantityChangeForId' as const;
  readonly type = OrderQuantityChangeForId.Type;
  constructor(public id: number, public quantity: string) {}
}

export class OrderCusipChangeForId implements Action {
  static Type = 'Transaction/Order/CusipChangeForId' as const;
  readonly type = OrderCusipChangeForId.Type;
  constructor(public id: number, public cusip: string) {}
}

export class OrderCusipFoundForId implements Action {
  static Type = 'Transaction/Order/CusipFoundForId' as const;
  readonly type = OrderCusipFoundForId.Type;
  constructor(public id: number, public cusip: string) {}
}

export class OrderCusipErrorForId implements Action {
  static Type = 'Transaction/Order/CusipErrorForId' as const;
  readonly type = OrderCusipErrorForId.Type;
  constructor(public id: number, public cusipError: string) {}
}

export class OrderPrefundedChangeForId implements Action {
  static Type = 'Transaction/Order/PrefundedChangeForId' as const;
  readonly type = OrderPrefundedChangeForId.Type;
  constructor(public id: number, public prefunded: boolean) {}
}

export class OrderDateChangeForId implements Action {
  static Type = 'Transaction/Order/DateChangeForId' as const;
  readonly type = OrderDateChangeForId.Type;
  constructor(public id: number, public date: string) {}
}

export class OrderCommentChangeForId implements Action {
  static Type = 'Transaction/Order/CommentChangeForId' as const;
  readonly type = OrderCommentChangeForId.Type;
  constructor(public id: number, public comment: string) {}
}

export class OrderCusipSearchOpenForId implements Action {
  static Type = 'Transaction/Order/CusipSearchOpenForId' as const;
  readonly type = OrderCusipSearchOpenForId.Type;
  constructor(public id: number) {}
}

export class OrderCusipSearchCloseForId implements Action {
  static Type = 'Transaction/Order/CusipSearchCloseForId' as const;
  readonly type = OrderCusipSearchCloseForId.Type;
  constructor(public id: number) {}
}
