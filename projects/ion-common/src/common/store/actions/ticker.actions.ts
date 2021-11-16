import { Action } from '@ngrx/store';
import { ITickerResult } from '../../types/ticker';

export class TickerSecurityNameChange implements Action {
  static Type = 'Common/Ticker/SecurityNameChange' as const;
  readonly type = TickerSecurityNameChange.Type;
  constructor(public securityName: string) {}
}

export class TickerIssuerNameChange implements Action {
  static Type = 'Common/Ticker/IssuerNameChange' as const;
  readonly type = TickerIssuerNameChange.Type;
  constructor(public issuerName: string) {}
}

export class TickerCusipChange implements Action {
  static Type = 'Common/Ticker/CusipChange' as const;
  readonly type = TickerCusipChange.Type;
  constructor(public cusip: string) {}
}

export class TickerSearch implements Action {
  static Type = 'Common/Ticker/Search' as const;
  readonly type = TickerSearch.Type;
}

export class TickerReset implements Action {
  static Type = 'Common/Ticker/Reset' as const;
  readonly type = TickerReset.Type;
}

export class TickerSearchFound implements Action {
  static Type = 'Common/Ticker/SearchFound' as const;
  readonly type = TickerSearchFound.Type;
  constructor(public result: ITickerResult) {}
}

export class TickerSearchError implements Action {
  static Type = 'Common/Ticker/SearchError' as const;
  readonly type = TickerSearchError.Type;
  constructor(public error: string) {}
}

export class TickerSearchBack implements Action {
  static Type = 'Common/Ticker/SearchBack' as const;
  readonly type = TickerSearchBack.Type;
}

export class TickerErrorClear implements Action {
  static Type = 'Common/Ticker/ErrorClear' as const;
  readonly type = TickerErrorClear.Type;
}

export class TickerSearchSelection implements Action {
  static Type = 'Common/Ticker/SearchSelection' as const;
  readonly type = TickerSearchSelection.Type;
  constructor(public ticker: string) {}
}
