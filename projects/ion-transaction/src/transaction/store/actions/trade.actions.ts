import { IDataProvider } from '@dtcc-uif/shared';
import { Action } from '@ngrx/store';
import { ITradeSummary } from '../../types/trade';

export class TradeCountChange implements Action {
  static Type = 'Transaction/Trade/TradeCountChange' as const;
  readonly type = TradeCountChange.Type;
  constructor(public count: number) {}
}

export class LoadParticipants implements Action {
  static Type = 'Transaction/Trade/LoadParticipants' as const;
  readonly type = LoadParticipants.Type;
  constructor(public participants: Array<string>) {}
}

export class LoadSecurities implements Action {
  static Type = 'Transaction/Trade/LoadSecurities' as const;
  readonly type = LoadSecurities.Type;
  constructor(public securities: Array<string>) {}
}

export class TradeParticipantIdChange implements Action {
  static Type = 'Transaction/Trade/ParticipantIdChange' as const;
  readonly type = TradeParticipantIdChange.Type;
  constructor(public participantId: Array<string>) {}
}

export class TradeCusipChange implements Action {
  static Type = 'Transaction/Trade/CusipChange' as const;
  readonly type = TradeCusipChange.Type;
  constructor(public cusip: Array<string>) {}
}

export class TradeDirectionChange implements Action {
  static Type = 'Transaction/Trade/DirectionChange' as const;
  readonly type = TradeDirectionChange.Type;
  constructor(public direction: Array<string>) {}
}

export class TradeSettlementTypeChange implements Action {
  static Type = 'Transaction/Trade/SettlementTypeChange' as const;
  readonly type = TradeSettlementTypeChange.Type;
  constructor(public settlementType: Array<string>) {}
}

export class TradePageLoaded implements Action {
  static Type = 'Transaction/Trade/PageLoaded' as const;
  readonly type = TradePageLoaded.Type;
}

export class TradePageRefreshed implements Action {
  static Type = 'Transaction/Trade/PageRefreshed' as const;
  readonly type = TradePageRefreshed.Type;
}

export class TradePageDestroyed implements Action {
  static Type = 'Transaction/Trade/PageDestroyed' as const;
  readonly type = TradePageDestroyed.Type;
}

export class TradeClearPageError implements Action {
  static Type = 'Transaction/Trade/ClearPageError' as const;
  readonly type = TradeClearPageError.Type;
}

export class TradeClearPageSuccess implements Action {
  static Type = 'Transaction/Trade/ClearPageSuccess' as const;
  readonly type = TradeClearPageSuccess.Type;
}

export class TradeFormEnterKeyed implements Action {
  static Type = 'Transaction/Trade/FormEnterKeyed' as const;
  readonly type = TradeFormEnterKeyed.Type;
}

export class TradeSummarySearch implements Action {
  static Type = 'Transaction/Trade/SummarySearch' as const;
  readonly type = TradeSummarySearch.Type;
  constructor(public payload?: unknown) {}
}

export class TradeSummaryFound implements Action {
  static Type = 'Transaction/Trade/SummaryFound' as const;
  readonly type = TradeSummaryFound.Type;
  constructor(public summary: ITradeSummary) {}
}

export class TradeSummaryError implements Action {
  static Type = 'Transaction/Trade/SummaryError' as const;
  readonly type = TradeSummaryError.Type;
  constructor(public error: string) {}
}

export class TradeSummaryServerError implements Action {
  static Type = 'Transaction/Trade/SummaryServerError' as const;
  readonly type = TradeSummaryServerError.Type;
  constructor(public error: string) {}
}

export class TradeResetForm implements Action {
  static Type = 'Transaction/Trade/ResetForm' as const;
  readonly type = TradeResetForm.Type;
}

export class TradeDetailSubmit implements Action {
  static Type = 'Transaction/Trade/TradeDetailSubmit' as const;
  readonly type = TradeDetailSubmit.Type;
}

export class TradeSubmitSuccess implements Action {
  static Type = 'Transaction/Trade/SubmitSuccess' as const;
  readonly type = TradeSubmitSuccess.Type;
}

export class TradeSubmitError implements Action {
  static Type = 'Transaction/Trade/SubmitError' as const;
  readonly type = TradeSubmitError.Type;
  constructor(public error: string) {}
}
