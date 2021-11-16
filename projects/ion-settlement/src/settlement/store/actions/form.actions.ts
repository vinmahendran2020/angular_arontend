import { Action } from '@ngrx/store';

export class FormPageLoaded implements Action {
  static Type = 'Settlement/Form/PageLoaded' as const;
  readonly type = FormPageLoaded.Type;
}

export class FormPageRefreshed implements Action {
  static Type = 'Settlement/Form/PageRefreshed' as const;
  readonly type = FormPageRefreshed.Type;
}

export class FormPageDestroyed implements Action {
  static Type = 'Settlement/Form/PageDestroyed' as const;
  readonly type = FormPageDestroyed.Type;
}

export class FormParticipantIdChange implements Action {
  static Type = 'Settlement/Form/ParticipantIdChange' as const;
  readonly type = FormParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class FormParticipantIdFound implements Action {
  static Type = 'Settlement/Form/ParticipantIdFound' as const;
  readonly type = FormParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class FormParticipantIdError implements Action {
  static Type = 'Settlement/Form/ParticipantIdError' as const;
  readonly type = FormParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class FormTransactionTypeChange implements Action {
  static Type = 'Settlement/Form/TransactionTypeChange' as const;
  readonly type = FormTransactionTypeChange.Type;
  constructor(public transactionType: string) {}
}

export class FormBusinessDateChange implements Action {
  static Type = 'Settlement/Form/BusinessDateChange' as const;
  readonly type = FormBusinessDateChange.Type;
  constructor(public businessDate: string) {}
}

export class FormFormEnterKeyed implements Action {
  static Type = 'Settlement/Form/FormEnterKeyed' as const;
  readonly type = FormFormEnterKeyed.Type;
}

export class FormBeginReset implements Action {
  static Type = 'Settlement/Form/BeginReset' as const;
  readonly type = FormBeginReset.Type;
}

export class FormResetForm implements Action {
  static Type = 'Settlement/Form/ResetForm' as const;
  readonly type = FormResetForm.Type;
}

export class FormSummarySearch implements Action {
  static Type = 'Settlement/Form/SummarySearch' as const;
  readonly type = FormSummarySearch.Type;
  constructor(public message: string) {}
}
