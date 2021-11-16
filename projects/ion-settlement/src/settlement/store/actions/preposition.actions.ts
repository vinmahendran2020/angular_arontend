import { Action } from '@ngrx/store';
import { IPreposition } from '../../types/preposition';

export class PrepositionPageLoaded implements Action {
  static Type = 'Settlement/Preposition/PageLoaded' as const;
  readonly type = PrepositionPageLoaded.Type;
}

export class PrepositionPageDestroyed implements Action {
  static Type = 'Settlement/Preposition/PageDestroyed' as const;
  readonly type = PrepositionPageDestroyed.Type;
}

export class PrepositionClearPageError implements Action {
  static Type = 'Settlement/Preposition/ClearPageError' as const;
  readonly type = PrepositionClearPageError.Type;
}

export class PrepositionClearPageSuccess implements Action {
  static Type = 'Settlement/Preposition/ClearPageSuccess' as const;
  readonly type = PrepositionClearPageSuccess.Type;
}

export class PrepositionResetForm implements Action {
  static Type = 'Settlement/Preposition/ResetForm' as const;
  readonly type = PrepositionResetForm.Type;
}

export class PrepositionSummarySearch implements Action {
  static Type = 'Settlement/Preposition/SummarySearch' as const;
  readonly type = PrepositionSummarySearch.Type;
}

export class PrepositionSummaryFound implements Action {
  static Type = 'Settlement/Preposition/SummaryFound' as const;
  readonly type = PrepositionSummaryFound.Type;
  constructor(public prepositions: IPreposition[]) {}
}

export class PrepositionSummaryError implements Action {
  static Type = 'Settlement/Preposition/SummaryError' as const;
  readonly type = PrepositionSummaryError.Type;
  constructor(public error: string) {}
}

export class PrepositionSummaryServerError implements Action {
  static Type = 'Settlement/Preposition/SummaryServerError' as const;
  readonly type = PrepositionSummaryServerError.Type;
  constructor(public error: string) {}
}

export class PrepositionFilterSummary implements Action {
  static Type = 'Settlement/Preposition/FilterSummary' as const;
  readonly type = PrepositionFilterSummary.Type;
}

export class PrepositionCusipNameChange implements Action {
  static Type = 'Settlement/Preposition/CusipNameChange' as const;
  readonly type = PrepositionCusipNameChange.Type;
  constructor(public cusipName: string) {}
}

export class PrepositionCusipIdChange implements Action {
  static Type = 'Settlement/Preposition/CusipIdChange' as const;
  readonly type = PrepositionCusipIdChange.Type;
  constructor(public cusipId: string) {}
}

export class PrepositionActionChange implements Action {
  static Type = 'Settlement/Preposition/ActionChange' as const;
  readonly type = PrepositionActionChange.Type;
  constructor(public action: string) {}
}
