import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './routing/dashboard-routing.module';

import { DashboardComponent } from './view/dashboard/dashboard.component';

import { IonSharedModule } from 'ion-shared';
import { IonCoreModule } from 'ion-core';
import { IonCommonModule } from 'ion-common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DashboardFacade } from './facade/dashboard.facade';
import { DashboardEffects } from './store/effects/dashboard.effects';

import { reducers } from './store/reducers/dashboard.reducer';

import { PositionService } from './service/position.service';
import { PositionFacade } from './facade/position.facade';
import { PositionEffects } from './store/effects/position.effects';

import { RiskService } from './service/risk.service';
import { RiskFacade } from './facade/risk.facade';
import { RiskEffects } from './store/effects/risk.effects';

import { ObligationService } from './service/obligation.service';
import { ObligationFacade } from './facade/obligation.facade';
import { ObligationEffects } from './store/effects/obligation.effects';

import { PositionsComponent } from './view/positions/positions.component';
import { PositionsSearchComponent } from './view/positions/positions-search/positions-search.component';
import { PositionsSummaryComponent } from './view/positions/positions-summary/positions-summary.component';

import { RiskManagementComponent } from './view/risk-management/risk-management.component';
import { RiskManagementSearchComponent } from './view/risk-management/risk-management-search/risk-management-search.component';
import { RiskManagementSummaryComponent } from './view/risk-management/risk-management-summary/risk-management-summary.component';

import { NettedObligationsComponent } from './view/netted-obligations/netted-obligations.component';
import { NettedObligationsSearchComponent } from './view/netted-obligations/netted-obligations-search/netted-obligations-search.component';
import { NettedObligationsSummaryComponent } from './view/netted-obligations/netted-obligations-summary/netted-obligations-summary.component';
import { TradeDetailsDialogComponent } from './view/netted-obligations/trade-details-dialog/trade-details-dialog.component';
import { PendingActivityDialogComponent } from './view/netted-obligations/pending-activity-dialog/pending-activity-dialog.component';

import { LinkRendererComponent } from './view/netted-obligations/link-renderer/link-renderer.component';
import { StatusLinkRendererComponent } from './view/netted-obligations/status-link-renderer/status-link-renderer.component';
import { TransactionPendingActionComponent } from './view/netted-obligations/transaction-pending-action/transaction-pending-action.component';

import { CCAService } from './service/cca.service';
import { CCAFacade } from './facade/cca.facade';
import { CCAEffects } from './store/effects/cca.effects';

import { CCAComponent } from './view/cca/cca.component';
import { CCASearchComponent } from './view/cca/cca-search/cca-search.component';
import { CCASummaryComponent } from './view/cca/cca-summary/cca-summary.component';
import { CCADetailComponent } from './view/cca/cca-detail/cca-detail.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PositionsComponent,
    PositionsSearchComponent,
    PositionsSummaryComponent,
    RiskManagementComponent,
    RiskManagementSearchComponent,
    RiskManagementSummaryComponent,
    NettedObligationsComponent,
    NettedObligationsSearchComponent,
    NettedObligationsSummaryComponent,
    TradeDetailsDialogComponent,
    PendingActivityDialogComponent,
    LinkRendererComponent,
    StatusLinkRendererComponent,
    TransactionPendingActionComponent,
    CCAComponent,
    CCASearchComponent,
    CCASummaryComponent,
    CCADetailComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IonSharedModule,
    IonCoreModule,
    IonCommonModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature([
      DashboardEffects,
      PositionEffects,
      RiskEffects,
      ObligationEffects,
      CCAEffects,
    ]),
  ],
  providers: [
    DashboardFacade,
    PositionFacade,
    PositionService,
    RiskFacade,
    RiskService,
    ObligationFacade,
    ObligationService,
    CCAFacade,
    CCAService,
  ],
})
export class IonDashboardModule {}
