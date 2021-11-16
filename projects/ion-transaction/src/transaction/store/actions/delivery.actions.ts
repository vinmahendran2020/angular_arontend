import { Action } from '@ngrx/store';
import { IDelivery, IDeliverySummary } from '../../types/delivery';

export class DeliveryPageLoaded implements Action {
  static Type = 'Transaction/Delivery/PageLoaded' as const;
  readonly type = DeliveryPageLoaded.Type;
}

export class DeliveryPageRefreshed implements Action {
  static Type = 'Transaction/Delivery/PageRefreshed' as const;
  readonly type = DeliveryPageRefreshed.Type;
}

export class DeliveryPageDestroyed implements Action {
  static Type = 'Transaction/Delivery/PageDestroyed' as const;
  readonly type = DeliveryPageDestroyed.Type;
}

export class DeliveryClearPageError implements Action {
  static Type = 'Transaction/Delivery/ClearPageError' as const;
  readonly type = DeliveryClearPageError.Type;
}

export class DeliveryClearPageSuccess implements Action {
  static Type = 'Transaction/Delivery/ClearPageSuccess' as const;
  readonly type = DeliveryClearPageSuccess.Type;
}

export class DeliveryParticipantIdChange implements Action {
  static Type = 'Transaction/Delivery/ParticipantIdChange' as const;
  readonly type = DeliveryParticipantIdChange.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class DeliveryParticipantIdFound implements Action {
  static Type = 'Transaction/Delivery/ParticipantIdFound' as const;
  readonly type = DeliveryParticipantIdFound.Type;
  constructor(public participantId: string, public triggerSearch: boolean) {}
}

export class DeliveryParticipantIdError implements Action {
  static Type = 'Transaction/Delivery/ParticipantIdError' as const;
  readonly type = DeliveryParticipantIdError.Type;
  constructor(public participantIdError: string) {}
}

export class DeliveryFormEnterKeyed implements Action {
  static Type = 'Transaction/Delivery/FormEnterKeyed' as const;
  readonly type = DeliveryFormEnterKeyed.Type;
}

export class DeliverySearch implements Action {
  static Type = 'Transaction/Delivery/Search' as const;
  readonly type = DeliverySearch.Type;
}

export class DeliverySearchFound implements Action {
  static Type = 'Transaction/Delivery/SearchFound' as const;
  readonly type = DeliverySearchFound.Type;
  constructor(public deliveries: IDelivery[]) {}
}

export class DeliverySearchError implements Action {
  static Type = 'Transaction/Delivery/SearchError' as const;
  readonly type = DeliverySearchError.Type;
  constructor(public error: string) {}
}

export class DeliverySearchServerError implements Action {
  static Type = 'Transaction/Delivery/SearchServerError' as const;
  readonly type = DeliverySearchServerError.Type;
  constructor(public error: string) {}
}

export class DeliverySubmit implements Action {
  static Type = 'Transaction/Delivery/Submit' as const;
  readonly type = DeliverySubmit.Type;
}

export class DeliverySubmitSuccess implements Action {
  static Type = 'Transaction/Delivery/SubmitSuccess' as const;
  readonly type = DeliverySubmitSuccess.Type;
  constructor(public ids: string[]) {}
}

export class DeliverySubmitFailure implements Action {
  static Type = 'Transaction/Delivery/SubmitFailure' as const;
  readonly type = DeliverySubmitFailure.Type;
  constructor(public ids: string[]) {}
}

export class DeliverySubmitError implements Action {
  static Type = 'Transaction/Delivery/SubmitError' as const;
  readonly type = DeliverySubmitError.Type;
  constructor(public error: string) {}
}

export class DeliveryResetSummary implements Action {
  static Type = 'Transaction/Delivery/ResetSummary' as const;
  readonly type = DeliveryResetSummary.Type;
}

export class DeliveryOperationChangeForId implements Action {
  static Type = 'Transaction/Delivery/OperationChangeForId' as const;
  readonly type = DeliveryOperationChangeForId.Type;
  constructor(public id: string, public operation: string) {}
}

export class DeliveryFilterKindChange implements Action {
  static Type = 'Transaction/Delivery/FilterKindChange' as const;
  readonly type = DeliveryFilterKindChange.Type;
  constructor(public kind: string) {}
}

export class DeliveryFilterValueChange implements Action {
  static Type = 'Transaction/Delivery/FilterValueChange' as const;
  readonly type = DeliveryFilterValueChange.Type;
  constructor(public value: string) {}
}
