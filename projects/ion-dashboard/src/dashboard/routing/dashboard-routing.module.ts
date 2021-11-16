import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../view/dashboard/dashboard.component';

import { PositionsComponent } from '../view/positions/positions.component';
import { RiskManagementComponent } from '../view/risk-management/risk-management.component';
import { NettedObligationsComponent } from '../view/netted-obligations/netted-obligations.component';
import { CCAComponent } from '../view/cca/cca.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/position',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: 'position',
        data: { title: 'Positions', breadcrumb: true, status: false },
        component: PositionsComponent,
      },
      {
        path: 'risk',
        data: { title: 'Risk Management Controls', breadcrumb: true, status: false },
        component: RiskManagementComponent,
      },
      {
        path: 'obligation',
        data: { title: 'Netted Obligations', breadcrumb: true, status: false },
        component: NettedObligationsComponent,
      },
      {
        path: 'cca',
        data: { title: 'Clearing Cash Adjustments', breadcrumb: true, status: false },
        component: CCAComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
