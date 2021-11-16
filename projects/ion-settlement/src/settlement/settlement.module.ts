import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementRoutingModule } from './routing/settlement-routing.module';

import { IonSharedModule } from 'ion-shared';
import { IonAuthModule } from 'ion-auth';
import { IonCommonModule } from 'ion-common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SettlementFacade } from './facade/settlement.facade';
import { SettlementEffects } from './store/effects/settlement.effects';

import { reducers } from './store/reducers/settlement.reducer';

import { SettlementComponent } from './view/settlement/settlement.component';
import { SettlementSearchComponent } from './view/settlement/settlement-search/settlement-search.component';
import { SettlementSummaryComponent } from './view/settlement/settlement-summary/settlement-summary.component';

import { CashFacade } from './facade/cash.facade';
import { CashEffects } from './store/effects/cash.effects';
import { CashService } from './service/cash.service';

import { CashComponent } from './view/cash/cash.component';
import { CashFilterComponent } from './view/cash/cash-filter/cash-filter.component';
import { CashSummaryComponent } from './view/cash/cash-summary/cash-summary.component';

import { MemoFacade } from './facade/memo.facade';
import { MemoEffects } from './store/effects/memo.effects';
import { MemoService } from './service/memo.service';

import { MemoComponent } from './view/memo/memo.component';
import { MemoFilterComponent } from './view/memo/memo-filter/memo-filter.component';
import { MemoSummaryComponent } from './view/memo/memo-summary/memo-summary.component';

import { OrderFacade } from './facade/order.facade';
import { OrderEffects } from './store/effects/order.effects';
import { OrderService } from './service/order.service';

import { OrderComponent } from './view/order/order.component';
import { OrderFilterComponent } from './view/order/order-filter/order-filter.component';
import { OrderSummaryComponent } from './view/order/order-summary/order-summary.component';

import { MovementFacade } from './facade/movement.facade';
import { MovementEffects } from './store/effects/movement.effects';
import { MovementService } from './service/movement.service';

import { MovementComponent } from './view/movement/movement.component';
import { MovementFilterComponent } from './view/movement/movement-filter/movement-filter.component';
import { MovementSummaryComponent } from './view/movement/movement-summary/movement-summary.component';

import { ObligationFacade } from './facade/obligation.facade';
import { ObligationEffects } from './store/effects/obligation.effects';
import { ObligationService } from './service/obligation.service';

import { ObligationComponent } from './view/obligation/obligation.component';
import { ObligationFilterComponent } from './view/obligation/obligation-filter/obligation-filter.component';
import { ObligationSummaryComponent } from './view/obligation/obligation-summary/obligation-summary.component';

import { AdjustmentFacade } from './facade/adjustment.facade';
import { AdjustmentEffects } from './store/effects/adjustment.effects';
import { AdjustmentService } from './service/adjustment.service';

import { AdjustmentComponent } from './view/adjustment/adjustment.component';
import { AdjustmentFilterComponent } from './view/adjustment/adjustment-filter/adjustment-filter.component';
import { AdjustmentSummaryComponent } from './view/adjustment/adjustment-summary/adjustment-summary.component';

import { PrepositionFacade } from './facade/preposition.facade';
import { PrepositionEffects } from './store/effects/preposition.effects';
import { PrepositionService } from './service/preposition.service';

import { PrepositionComponent } from './view/preposition/preposition.component';
import { PrepositionFilterComponent } from './view/preposition/preposition-filter/preposition-filter.component';
import { PrepositionSummaryComponent } from './view/preposition/preposition-summary/preposition-summary.component';

@NgModule({
  declarations: [
    SettlementComponent,
    SettlementSearchComponent,
    SettlementSummaryComponent,
    CashComponent,
    CashFilterComponent,
    CashSummaryComponent,
    MemoComponent,
    MemoFilterComponent,
    MemoSummaryComponent,
    OrderComponent,
    OrderFilterComponent,
    OrderSummaryComponent,
    MovementComponent,
    MovementFilterComponent,
    MovementSummaryComponent,
    ObligationComponent,
    ObligationFilterComponent,
    ObligationSummaryComponent,
    AdjustmentComponent,
    AdjustmentFilterComponent,
    AdjustmentSummaryComponent,
    PrepositionComponent,
    PrepositionFilterComponent,
    PrepositionSummaryComponent,
  ],
  imports: [
    CommonModule,
    IonSharedModule,
    SettlementRoutingModule,
    IonSharedModule,
    IonAuthModule,
    IonCommonModule,
    StoreModule.forFeature('settlement', reducers),
    EffectsModule.forFeature([
      SettlementEffects,
      CashEffects,
      MemoEffects,
      OrderEffects,
      MovementEffects,
      ObligationEffects,
      AdjustmentEffects,
      PrepositionEffects,
    ]),
  ],
  providers: [
    SettlementFacade,
    CashFacade,
    CashService,
    MemoFacade,
    MemoService,
    OrderFacade,
    OrderService,
    MovementFacade,
    MovementService,
    ObligationFacade,
    ObligationService,
    AdjustmentFacade,
    AdjustmentService,
    PrepositionFacade,
    PrepositionService,
  ],
})
export class IonSettlementModule {}
