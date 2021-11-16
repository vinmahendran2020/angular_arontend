import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './routing/transaction-routing.module';

import { TransactionComponent } from './view/transaction/transaction.component';

import { IonSharedModule } from 'ion-shared';
import { IonAuthModule } from 'ion-auth';
import { IonCommonModule } from 'ion-common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TransactionFacade } from './facade/transaction.facade';
import { TransactionEffects } from './store/effects/transaction.effects';

import { reducers } from './store/reducers/transaction.reducer';

import { CashService } from './service/cash.service';
import { CashFacade } from './facade/cash.facade';
import { CashEffects } from './store/effects/cash.effects';

import { CashComponent } from './view/cash/cash.component';
import { CashSearchComponent } from './view/cash/cash-search/cash-search.component';
import { CashSummaryComponent } from './view/cash/cash-summary/cash-summary.component';
import { CashBalanceComponent } from './view/cash/cash-balance/cash-balance.component';
import { CashActivityComponent } from './view/cash/cash-activity/cash-activity.component';

import { BilateralComponent } from './view/bilateral/bilateral.component';

import { OrderService } from './service/order.service';
import { OrderFacade } from './facade/order.facade';
import { OrderEffects } from './store/effects/order.effects';

import { OrdersComponent } from './view/bilateral/orders/orders.component';
import { OrderCommentComponent } from './view/bilateral/orders/order-comment/order-comment.component';
import { OrdersSearchComponent } from './view/bilateral/orders/orders-search/orders-search.component';
import { OrderSummaryComponent } from './view/bilateral/orders/order-summary/order-summary.component';
import { OrdersSummaryComponent } from './view/bilateral/orders/orders-summary/orders-summary.component';

import { DeliveryService } from './service/delivery.service';
import { DeliveryFacade } from './facade/delivery.facade';
import { DeliveryEffects } from './store/effects/delivery.effects';

import { DeliveriesComponent } from './view/bilateral/deliveries/deliveries.component';
import { DeliveryCommentComponent } from './view/bilateral/deliveries/delivery-comment//delivery-comment.component';
import { DeliveriesSearchComponent } from './view/bilateral/deliveries/deliveries-search/deliveries-search.component';
import { DeliverySummaryComponent } from './view/bilateral/deliveries/delivery-summary/delivery-summary.component';
import { DeliveriesSummaryComponent } from './view/bilateral/deliveries/deliveries-summary/deliveries-summary.component';

import { MemoFacade } from './facade/memo.facade';
import { MemoEffects } from './store/effects/memo.effects';
import { MemoService } from './service/memo.service';

import { MemoSegregationsComponent } from './view/memo-segregations/memo-segregations.component';
import { MemoSegregationSummaryComponent } from './view/memo-segregations/memo-segregation-summary/memo-segregation-summary.component';
import { MemoSegregationsSearchComponent } from './view/memo-segregations/memo-segregations-search/memo-segregations-search.component';
import { MemoSegregationsSummaryComponent } from './view/memo-segregations/memo-segregations-summary/memo-segregations-summary.component';

import { PrepositionService } from './service/preposition.service';
import { PrepositionFacade } from './facade/preposition.facade';
import { PrepositionEffects } from './store/effects/preposition.effects';

import { PrepositioningComponent } from './view/pre-positioning/pre-positioning.component';
import { PrepositioningSearchComponent } from './view/pre-positioning/pre-positioning-search/pre-positioning-search.component';
import { PrepositioningSubmissionsComponent } from './view/pre-positioning/pre-positioning-submissions/pre-positioning-submissions.component';
import { PrepositioningEntryComponent } from './view/pre-positioning/pre-positioning-entry/pre-positioning-entry.component';

import { TradeComponent } from './view/trade/trade.component';
import { TradeSearchComponent } from './view/trade/trade-search/trade-search.component';
import { TradeSummaryComponent } from './view/trade/trade-summary/trade-summary.component';

import { TradeFacade } from './facade/trade.facade';
import { TradeService } from './service/trade.service';
import { TradeEffects } from './store/effects/trade.effects'

@NgModule({
  declarations: [
    TransactionComponent,
    CashComponent,
    CashSearchComponent,
    CashSummaryComponent,
    CashBalanceComponent,
    CashActivityComponent,
    BilateralComponent,
    PrepositioningComponent,
    PrepositioningSearchComponent,
    PrepositioningSubmissionsComponent,
    PrepositioningEntryComponent,
    OrdersComponent,
    OrderCommentComponent,
    OrdersSearchComponent,
    OrderSummaryComponent,
    OrdersSummaryComponent,
    DeliveriesComponent,
    DeliveryCommentComponent,
    DeliveriesSearchComponent,
    DeliverySummaryComponent,
    DeliveriesSummaryComponent,
    TradeComponent,
    TradeSearchComponent,
    TradeSummaryComponent,
    MemoSegregationsComponent,
    MemoSegregationsSearchComponent,
    MemoSegregationSummaryComponent,
    MemoSegregationsSummaryComponent,
  ],
  imports: [
    CommonModule,
    IonSharedModule,
    TransactionRoutingModule,
    IonSharedModule,
    IonAuthModule,
    IonCommonModule,
    StoreModule.forFeature('transaction', reducers),
    EffectsModule.forFeature([
      TransactionEffects,
      CashEffects,
      OrderEffects,
      DeliveryEffects,
      PrepositionEffects,
      TradeEffects,
      MemoEffects,
    ]),
  ],
  providers: [
    TransactionFacade,
    CashFacade,
    CashService,
    OrderFacade,
    OrderService,
    DeliveryFacade,
    DeliveryService,
    TradeFacade,
    TradeService,
    MemoFacade,
    MemoService,
    PrepositionFacade,
    PrepositionService,
  ],
})
export class IonTransactionModule {}
