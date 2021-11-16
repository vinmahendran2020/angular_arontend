import { Action } from '@ngrx/store';
import {
  IObligationSummary,
  IObligationTrade,
  IObligationTransaction,
  ObligationSortBy,
} from '../../types/obligation';

export class ObligationPageLoaded implements Action {
  static Type = 'Dashboard/Obligation/PageLoaded' as const;
  readonly type = ObligationPageLoaded.Type;
}

export class ObligationPageRefreshed implements Action {
  static Type = 'Dashboard/Obligation/PageRefreshed' as const;
  readonly type = ObligationPageRefreshed.Type;
}

export class ObligationPageDestroyed implements Action {
  static Type = 'Dashboard/Obligation/PageDestroyed' as const;
  readonly type = ObligationPageDestroyed.Type;
}

export class ObligationClearPageError implements Action {
  static Type = 'Dashboard/Obligation/ClearPageError' as const;
  readonly type = ObligationClearPageError.Type;
}

export class ObligationClearPageSuccess implements Action {
  static Type = 'Dashboard/Obligation/ClearPageSuccess' as const;
  readonly type = ObligationClearPageSuccess.Type;
}

export class ObligationParticipantIdChange implements Action {
  static Type = 'Dashboard/Obligation/ParticipantIdChange' as const;
  readonly type = ObligationParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class ObligationParticipantIdFound implements Action {
  static Type = 'Dashboard/Obligation/ParticipantIdFound' as const;
  readonly type = ObligationParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class ObligationParticipantIdError implements Action {
  static Type = 'Dashboard/Obligation/ParticipantIdError' as const;
  readonly type = ObligationParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class ObligationFormEnterKeyed implements Action {
  static Type = 'Dashboard/Obligation/FormEnterKeyed' as const;
  readonly type = ObligationFormEnterKeyed.Type;
}

export class ObligationResetForm implements Action {
  static Type = 'Dashboard/Obligation/ResetForm' as const;
  readonly type = ObligationResetForm.Type;
}

export class ObligationSummarySearch implements Action {
  static Type = 'Dashboard/Obligation/SummarySearch' as const;
  readonly type = ObligationSummarySearch.Type;
}

export class ObligationSummaryFound implements Action {
  static Type = 'Dashboard/Obligation/SummaryFound' as const;
  readonly type = ObligationSummaryFound.Type;
  constructor(public summary: IObligationSummary) {}
}

export class ObligationSummaryError implements Action {
  static Type = 'Dashboard/Obligation/SummaryError' as const;
  readonly type = ObligationSummaryError.Type;
  constructor(public error: string) {}
}

export class ObligationSummaryServerError implements Action {
  static Type = 'Dashboard/Obligation/SummaryServerError' as const;
  readonly type = ObligationSummaryServerError.Type;
  constructor(public error: string) {}
}

export class ObligationTransactionsOpen implements Action {
  static Type = 'Dashboard/Obligation/TransactionsOpen' as const;
  readonly type = ObligationTransactionsOpen.Type;
  constructor(public obligationId: string) {}
}

export class ObligationTransactionsClose implements Action {
  static Type = 'Dashboard/Obligation/TransactionsClose' as const;
  readonly type = ObligationTransactionsClose.Type;
}

export class ObligationTradesOpen implements Action {
  static Type = 'Dashboard/Obligation/TradesOpen' as const;
  readonly type = ObligationTradesOpen.Type;
  constructor(public obligationId: string, public ticker: string) {}
}

export class ObligationTradesClose implements Action {
  static Type = 'Dashboard/Obligation/TradesClose' as const;
  readonly type = ObligationTradesClose.Type;
}

export class ObligationTradesFetch implements Action {
  static Type = 'Dashboard/Obligation/TradesFetch' as const;
  readonly type = ObligationTradesFetch.Type;
  constructor(public ticker: string) {}
}

export class ObligationTradesFound implements Action {
  static Type = 'Dashboard/Obligation/TradesFound' as const;
  readonly type = ObligationTradesFound.Type;
  constructor(public trades: IObligationTrade[]) {}
}

export class ObligationTradesError implements Action {
  static Type = 'Dashboard/Obligation/TradesError' as const;
  readonly type = ObligationTradesError.Type;
  constructor(public error: string) {}
}

export class ObligationTransactionsFetch implements Action {
  static Type = 'Dashboard/Obligation/TransactionsFetch' as const;
  readonly type = ObligationTransactionsFetch.Type;
}

export class ObligationTransactionsFound implements Action {
  static Type = 'Dashboard/Obligation/TransactionsFound' as const;
  readonly type = ObligationTransactionsFound.Type;
  constructor(public transactions: IObligationTransaction[]) {}
}

export class ObligationTransactionsError implements Action {
  static Type = 'Dashboard/Obligation/TransactionsError' as const;
  readonly type = ObligationTransactionsError.Type;
  constructor(public error: string) {}
}

export class ObligationCusipChange implements Action {
  static Type = 'Dashboard/Obligation/CusipChange' as const;
  readonly type = ObligationCusipChange.Type;
  constructor(public cusip: string) {}
}

export class ObligationSortByChange implements Action {
  static Type = 'Dashboard/Obligation/SortByChange' as const;
  readonly type = ObligationSortByChange.Type;
  constructor(public sortBy: ObligationSortBy) {}
}

export class ObligationCusipSearchOpen implements Action {
  static Type = 'Dashboard/Obligation/CusipSearchOpen' as const;
  readonly type = ObligationCusipSearchOpen.Type;
}

export class ObligationCusipSearchClose implements Action {
  static Type = 'Dashboard/Obligation/CusipSearchClose' as const;
  readonly type = ObligationCusipSearchClose.Type;
}
