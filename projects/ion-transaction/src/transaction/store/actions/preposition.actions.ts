import { Action } from '@ngrx/store';

import { ICusip } from 'ion-core';

export class PrepositionPageLoaded implements Action {
  static Type = 'Transaction/Preposition/PageLoaded' as const;
  readonly type = PrepositionPageLoaded.Type;
}

export class PrepositionPageRefreshed implements Action {
  static Type = 'Transaction/Preposition/PageRefreshed' as const;
  readonly type = PrepositionPageRefreshed.Type;
}

export class PrepositionPageDestroyed implements Action {
  static Type = 'Transaction/Preposition/PageDestroyed' as const;
  readonly type = PrepositionPageDestroyed.Type;
}

export class PrepositionClearPageError implements Action {
  static Type = 'Transaction/Preposition/ClearPageError' as const;
  readonly type = PrepositionClearPageError.Type;
}

export class PrepositionClearPageSuccess implements Action {
  static Type = 'Transaction/Preposition/ClearPageSuccess' as const;
  readonly type = PrepositionClearPageSuccess.Type;
}

export class PrepositionParticipantIdChange implements Action {
  static Type = 'Transaction/Preposition/ParticipantIdChange' as const;
  readonly type = PrepositionParticipantIdChange.Type;
  constructor(public participantId: string) {}
}

export class PrepositionParticipantIdFound implements Action {
  static Type = 'Transaction/Preposition/ParticipantIdFound' as const;
  readonly type = PrepositionParticipantIdFound.Type;
  constructor(public participantId: string) {}
}

export class PrepositionParticipantIdError implements Action {
  static Type = 'Transaction/Preposition/ParticipantIdError' as const;
  readonly type = PrepositionParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class PrepositionFormEnterKeyed implements Action {
  static Type = 'Transaction/Preposition/FormEnterKeyed' as const;
  readonly type = PrepositionFormEnterKeyed.Type;
}

export class PrepositionSubmit implements Action {
  static Type = 'Transaction/Preposition/Submit' as const;
  readonly type = PrepositionSubmit.Type;
}

export class PrepositionSubmitSuccess implements Action {
  static Type = 'Transaction/Preposition/SubmitSuccess' as const;
  readonly type = PrepositionSubmitSuccess.Type;
  constructor(public ids: number[]) {}
}

export class PrepositionSubmitFailure implements Action {
  static Type = 'Transaction/Preposition/SubmitFailure' as const;
  readonly type = PrepositionSubmitFailure.Type;
  constructor(public ids: number[]) {}
}

export class PrepositionSubmitError implements Action {
  static Type = 'Transaction/Preposition/SubmitError' as const;
  readonly type = PrepositionSubmitError.Type;
  constructor(public error: string) {}
}

export class PrepositionResetSummary implements Action {
  static Type = 'Transaction/Preposition/ResetSummary' as const;
  readonly type = PrepositionResetSummary.Type;
}

export class PrepositionAddNewRow implements Action {
  static Type = 'Transaction/Preposition/AddNewRow' as const;
  readonly type = PrepositionAddNewRow.Type;
}

export class PrepositionRemoveRowById implements Action {
  static Type = 'Transaction/Preposition/RemoveRowById' as const;
  readonly type = PrepositionRemoveRowById.Type;
  constructor(public id: number) {}
}

export class PrepositionActionChangeForId implements Action {
  static Type = 'Transaction/Preposition/ActionChangeForId' as const;
  readonly type = PrepositionActionChangeForId.Type;
  constructor(public id: number, public action: string) {}
}

export class PrepositionQuantityChangeForId implements Action {
  static Type = 'Transaction/Preposition/QuantityChangeForId' as const;
  readonly type = PrepositionQuantityChangeForId.Type;
  constructor(public id: number, public quantity: string) {}
}

export class PrepositionCusipChangeForId implements Action {
  static Type = 'Transaction/Preposition/CusipChangeForId' as const;
  readonly type = PrepositionCusipChangeForId.Type;
  constructor(public id: number, public cusip: string) {}
}

export class PrepositionCusipFoundForId implements Action {
  static Type = 'Transaction/Preposition/CusipFoundForId' as const;
  readonly type = PrepositionCusipFoundForId.Type;
  constructor(public id: number, public cusip: ICusip) {}
}

export class PrepositionCusipErrorForId implements Action {
  static Type = 'Transaction/Preposition/CusipErrorForId' as const;
  readonly type = PrepositionCusipErrorForId.Type;
  constructor(public id: number, public cusipError: string) {}
}

export class PrepositionCusipNameChangeForId implements Action {
  static Type = 'Transaction/Preposition/CusipNameChangeForId' as const;
  readonly type = PrepositionCusipNameChangeForId.Type;
  constructor(public id: number, public cusipName: string) {}
}

export class PrepositionCusipSearchOpenForId implements Action {
  static Type = 'Transaction/Preposition/CusipSearchOpenForId' as const;
  readonly type = PrepositionCusipSearchOpenForId.Type;
  constructor(public id: number) {}
}

export class PrepositionCusipSearchCloseForId implements Action {
  static Type = 'Transaction/Preposition/CusipSearchCloseForId' as const;
  readonly type = PrepositionCusipSearchCloseForId.Type;
  constructor(public id: number) {}
}
