import { Action } from '@ngrx/store';

export class MemoPageLoaded implements Action {
  static Type = 'Transaction/Memo/PageLoaded' as const;
  readonly type = MemoPageLoaded.Type;
}

export class MemoPageRefreshed implements Action {
  static Type = 'Transaction/Memo/PageRefreshed' as const;
  readonly type = MemoPageRefreshed.Type;
}

export class MemoPageDestroyed implements Action {
  static Type = 'Transaction/Memo/PageDestroyed' as const;
  readonly type = MemoPageDestroyed.Type;
}

export class MemoClearPageError implements Action {
  static Type = 'Transaction/Memo/ClearPageError' as const;
  readonly type = MemoClearPageError.Type;
}

export class MemoClearPageSuccess implements Action {
  static Type = 'Transaction/Memo/ClearPageSuccess' as const;
  readonly type = MemoClearPageSuccess.Type;
}

export class MemoParticipantIdChange implements Action {
  static Type = 'Transaction/Memo/ParticipantIdChange' as const;
  readonly type = MemoParticipantIdChange.Type;
  constructor(public participantId: string) {}
}

export class MemoParticipantIdFound implements Action {
  static Type = 'Transaction/Memo/ParticipantIdFound' as const;
  readonly type = MemoParticipantIdFound.Type;
  constructor(public participantId: string) {}
}

export class MemoParticipantIdError implements Action {
  static Type = 'Transaction/Memo/ParticipantIdError' as const;
  readonly type = MemoParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class MemoFormEnterKeyed implements Action {
  static Type = 'Transaction/Memo/FormEnterKeyed' as const;
  readonly type = MemoFormEnterKeyed.Type;
}

export class MemoSubmit implements Action {
  static Type = 'Transaction/Memo/Submit' as const;
  readonly type = MemoSubmit.Type;
}

export class MemoSubmitSuccess implements Action {
  static Type = 'Transaction/Memo/SubmitSuccess' as const;
  readonly type = MemoSubmitSuccess.Type;
  constructor(public ids: number[]) {}
}

export class MemoSubmitFailure implements Action {
  static Type = 'Transaction/Memo/SubmitFailure' as const;
  readonly type = MemoSubmitFailure.Type;
  constructor(public ids: number[]) {}
}

export class MemoSubmitError implements Action {
  static Type = 'Transaction/Memo/SubmitError' as const;
  readonly type = MemoSubmitError.Type;
  constructor(public error: string) {}
}

export class MemoResetSummary implements Action {
  static Type = 'Transaction/Memo/ResetSummary' as const;
  readonly type = MemoResetSummary.Type;
}

export class MemoAddNewRow implements Action {
  static Type = 'Transaction/Memo/AddNewRow' as const;
  readonly type = MemoAddNewRow.Type;
}

export class MemoRemoveRowById implements Action {
  static Type = 'Transaction/Memo/RemoveRowById' as const;
  readonly type = MemoRemoveRowById.Type;
  constructor(public id: number) {}
}

export class MemoActionChangeForId implements Action {
  static Type = 'Transaction/Memo/ActionChangeForId' as const;
  readonly type = MemoActionChangeForId.Type;
  constructor(public id: number, public action: string) {}
}

export class MemoQuantityChangeForId implements Action {
  static Type = 'Transaction/Memo/QuantityChangeForId' as const;
  readonly type = MemoQuantityChangeForId.Type;
  constructor(public id: number, public quantity: string) {}
}

export class MemoCusipChangeForId implements Action {
  static Type = 'Transaction/Memo/CusipChangeForId' as const;
  readonly type = MemoCusipChangeForId.Type;
  constructor(public id: number, public cusip: string) {}
}

export class MemoCusipFoundForId implements Action {
  static Type = 'Transaction/Memo/CusipFoundForId' as const;
  readonly type = MemoCusipFoundForId.Type;
  constructor(public id: number, public cusip: string) {}
}

export class MemoCusipErrorForId implements Action {
  static Type = 'Transaction/Memo/CusipErrorForId' as const;
  readonly type = MemoCusipErrorForId.Type;
  constructor(public id: number, public cusipError: string) {}
}

export class MemoCusipSearchOpenForId implements Action {
  static Type = 'Transaction/Memo/CusipSearchOpenForId' as const;
  readonly type = MemoCusipSearchOpenForId.Type;
  constructor(public id: number) {}
}

export class MemoCusipSearchCloseForId implements Action {
  static Type = 'Transaction/Memo/CusipSearchCloseForId' as const;
  readonly type = MemoCusipSearchCloseForId.Type;
  constructor(public id: number) {}
}

export class MemoCusipBalanceFoundForId implements Action {
  static Type = 'Transaction/Memo/CusipBalaceFoundForId' as const;
  readonly type = MemoCusipBalanceFoundForId.Type;
  constructor(
    public id: number,
    public participantId: string,
    public cusipId: string,
    public cusipName: string,
    public memoSegregation: number,
    public totalFreeExcess: number,
    public totalPositions: number
  ) {}
}

export class MemoCusipBalanceErrorForId implements Action {
  static Type = 'Transaction/Memo/CusipBalanceErrorForId' as const;
  readonly type = MemoCusipBalanceErrorForId.Type;
  constructor(public id: number, public cusipError: string) {}
}
