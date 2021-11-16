import { Action } from '@ngrx/store';
import { IOrder } from '../../types/order';

export class OrderPageLoaded implements Action {
  static Type = 'Settlement/Order/PageLoaded' as const;
  readonly type = OrderPageLoaded.Type;
}

export class OrderPageDestroyed implements Action {
  static Type = 'Settlement/Order/PageDestroyed' as const;
  readonly type = OrderPageDestroyed.Type;
}

export class OrderClearPageError implements Action {
  static Type = 'Settlement/Order/ClearPageError' as const;
  readonly type = OrderClearPageError.Type;
}

export class OrderClearPageSuccess implements Action {
  static Type = 'Settlement/Order/ClearPageSuccess' as const;
  readonly type = OrderClearPageSuccess.Type;
}

export class OrderResetForm implements Action {
  static Type = 'Settlement/Order/ResetForm' as const;
  readonly type = OrderResetForm.Type;
}

export class OrderSummarySearch implements Action {
  static Type = 'Settlement/Order/SummarySearch' as const;
  readonly type = OrderSummarySearch.Type;
}

export class OrderSummaryFound implements Action {
  static Type = 'Settlement/Order/SummaryFound' as const;
  readonly type = OrderSummaryFound.Type;
  constructor(public orders: IOrder[]) {}
}

export class OrderSummaryError implements Action {
  static Type = 'Settlement/Order/SummaryError' as const;
  readonly type = OrderSummaryError.Type;
  constructor(public error: string) {}
}

export class OrderSummaryServerError implements Action {
  static Type = 'Settlement/Order/SummaryServerError' as const;
  readonly type = OrderSummaryServerError.Type;
  constructor(public error: string) {}
}

export class OrderFilterSummary implements Action {
  static Type = 'Settlement/Order/FilterSummary' as const;
  readonly type = OrderFilterSummary.Type;
}

export class OrderDelivererIdChange implements Action {
  static Type = 'Settlement/Order/DelivererIdChange' as const;
  readonly type = OrderDelivererIdChange.Type;
  constructor(public delivererId: string) {}
}

export class OrderReceiverIdChange implements Action {
  static Type = 'Settlement/Order/ReceiverIdChange' as const;
  readonly type = OrderReceiverIdChange.Type;
  constructor(public receiverId: string) {}
}

export class OrderCusipNameChange implements Action {
  static Type = 'Settlement/Order/CusipNameChange' as const;
  readonly type = OrderCusipNameChange.Type;
  constructor(public cusipName: string) {}
}

export class OrderCusipIdChange implements Action {
  static Type = 'Settlement/Order/CusipIdChange' as const;
  readonly type = OrderCusipIdChange.Type;
  constructor(public cusipId: string) {}
}

export class OrderPrefundedChange implements Action {
  static Type = 'Settlement/Order/PrefundedChange' as const;
  readonly type = OrderPrefundedChange.Type;
  constructor(public prefunded: string) {}
}

export class OrderSettlementStatusChange implements Action {
  static Type = 'Settlement/Order/SettlementStatusChange' as const;
  readonly type = OrderSettlementStatusChange.Type;
  constructor(public settlementStatus: string) {}
}

export class OrderPendingReasonChange implements Action {
  static Type = 'Settlement/Order/PendingReasonChange' as const;
  readonly type = OrderPendingReasonChange.Type;
  constructor(public pendingReason: string) {}
}
