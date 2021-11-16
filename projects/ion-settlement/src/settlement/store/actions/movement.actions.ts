import { Action } from '@ngrx/store';
import { IMovement } from '../../types/movement';

export class MovementPageLoaded implements Action {
  static Type = 'Settlement/Movement/PageLoaded' as const;
  readonly type = MovementPageLoaded.Type;
}

export class MovementPageDestroyed implements Action {
  static Type = 'Settlement/Movement/PageDestroyed' as const;
  readonly type = MovementPageDestroyed.Type;
}

export class MovementClearPageError implements Action {
  static Type = 'Settlement/Movement/ClearPageError' as const;
  readonly type = MovementClearPageError.Type;
}

export class MovementClearPageSuccess implements Action {
  static Type = 'Settlement/Movement/ClearPageSuccess' as const;
  readonly type = MovementClearPageSuccess.Type;
}

export class MovementResetForm implements Action {
  static Type = 'Settlement/Movement/ResetForm' as const;
  readonly type = MovementResetForm.Type;
}

export class MovementSummarySearch implements Action {
  static Type = 'Settlement/Movement/SummarySearch' as const;
  readonly type = MovementSummarySearch.Type;
}

export class MovementSummaryFound implements Action {
  static Type = 'Settlement/Movement/SummaryFound' as const;
  readonly type = MovementSummaryFound.Type;
  constructor(public movements: IMovement[]) {}
}

export class MovementSummaryError implements Action {
  static Type = 'Settlement/Movement/SummaryError' as const;
  readonly type = MovementSummaryError.Type;
  constructor(public error: string) {}
}

export class MovementSummaryServerError implements Action {
  static Type = 'Settlement/Movement/SummaryServerError' as const;
  readonly type = MovementSummaryServerError.Type;
  constructor(public error: string) {}
}

export class MovementFilterSummary implements Action {
  static Type = 'Settlement/Movement/FilterSummary' as const;
  readonly type = MovementFilterSummary.Type;
}

export class MovementActionChange implements Action {
  static Type = 'Settlement/Movement/ActionChange' as const;
  readonly type = MovementActionChange.Type;
  constructor(public action: string) {}
}

export class MovementDateChange implements Action {
  static Type = 'Settlement/Movement/DateChange' as const;
  readonly type = MovementDateChange.Type;
  constructor(public date: string) {}
}
