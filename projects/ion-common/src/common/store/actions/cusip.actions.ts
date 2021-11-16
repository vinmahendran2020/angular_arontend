import { Action } from '@ngrx/store';
import { ICusipResult } from '../../types/cusip';

export class CusipSecurityNameChange implements Action {
  static Type = 'Common/Cusip/SecurityNameChange' as const;
  readonly type = CusipSecurityNameChange.Type;
  constructor(public securityName: string) {}
}

export class CusipIssuerNameChange implements Action {
  static Type = 'Common/Cusip/IssuerNameChange' as const;
  readonly type = CusipIssuerNameChange.Type;
  constructor(public issuerName: string) {}
}

export class CusipTickerChange implements Action {
  static Type = 'Common/Cusip/TickerChange' as const;
  readonly type = CusipTickerChange.Type;
  constructor(public ticker: string) {}
}

export class CusipSearch implements Action {
  static Type = 'Common/Cusip/Search' as const;
  readonly type = CusipSearch.Type;
}

export class CusipReset implements Action {
  static Type = 'Common/Cusip/Reset' as const;
  readonly type = CusipReset.Type;
}

export class CusipSearchFound implements Action {
  static Type = 'Common/Cusip/SearchFound' as const;
  readonly type = CusipSearchFound.Type;
  constructor(public result: ICusipResult) {}
}

export class CusipSearchError implements Action {
  static Type = 'Common/Cusip/SearchError' as const;
  readonly type = CusipSearchError.Type;
  constructor(public error: string) {}
}

export class CusipSearchBack implements Action {
  static Type = 'Common/Cusip/SearchBack' as const;
  readonly type = CusipSearchBack.Type;
}

export class CusipErrorClear implements Action {
  static Type = 'Common/Cusip/ErrorClear' as const;
  readonly type = CusipErrorClear.Type;
}

export class CusipSearchSelection implements Action {
  static Type = 'Common/Cusip/SearchSelection' as const;
  readonly type = CusipSearchSelection.Type;
  constructor(public cusip: string) {}
}
