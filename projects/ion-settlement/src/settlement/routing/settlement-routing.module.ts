import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettlementComponent } from '../view/settlement/settlement.component';

const routes: Routes = [
  {
    path: '',
    component: SettlementComponent,
    data: {
      title: 'Settlement Activity Inquiry',
      breadcrumb: false,
      status: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlementRoutingModule {}
