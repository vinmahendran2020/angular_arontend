import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../view/admin/admin.component';
import { NettingComponent } from '../view/netting/netting.component';
import { SettlementComponent } from '../view/settlement/settlement.component';
import { SecurityComponent } from '../view/security/security.component';
import { CashComponent } from '../view/cash/cash.component';
import { DailyProcessComponent } from '../view/daily-process/daily-process.component';
import { StartOfDayComponent } from '../view/start-of-day/start-of-day.component';
import { EndOfDayComponent } from '../view/end-of-day/end-of-day.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/daily-process/start',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: 'daily-process',
        component: DailyProcessComponent,
        data: { title: 'Daily Processes', breadcrumb: true, status: false },
        pathMatch: 'prefix',
        children: [
          {
            path: 'start',
            data: { title: 'Start of Day', breadcrumb: true, status: false },
            component: StartOfDayComponent,
          },
          {
            path: 'end',
            data: { title: 'End of Day', breadcrumb: true, status: false },
            component: EndOfDayComponent,
          },
        ],
      },
      {
        path: 'netting',
        data: { title: 'Netting', breadcrumb: true, status: false },
        component: NettingComponent,
      },
      {
        path: 'settlement',
        component: SettlementComponent,
        data: { title: 'Settlement', breadcrumb: true, status: false },
        pathMatch: 'prefix',
        children: [
          {
            path: 'security',
            data: { title: 'Security', breadcrumb: true, status: false },
            component: SecurityComponent,
          },
          {
            path: 'cash',
            data: { title: 'Cash', breadcrumb: true, status: false },
            component: CashComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
