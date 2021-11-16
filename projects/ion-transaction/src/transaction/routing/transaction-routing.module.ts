import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionComponent } from '../view/transaction/transaction.component';
import { PrepositioningComponent } from '../view/pre-positioning/pre-positioning.component';
import { CashComponent } from '../view/cash/cash.component';
import { BilateralComponent } from '../view/bilateral/bilateral.component';
import { OrdersComponent } from '../view/bilateral/orders/orders.component';
import { DeliveriesComponent } from '../view/bilateral/deliveries/deliveries.component';
import { TradeComponent } from '../view/trade/trade.component';
import { MemoSegregationsComponent } from '../view/memo-segregations/memo-segregations.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: 'cash',
        data: {
          title: 'Prefunded Ion Cash Management',
          breadcrumb: true,
          status: true,
        },
        component: CashComponent,
      },
      {
        path: 'memo',
        data: {
          title: 'Memo Segregation',
          breadcrumb: true,
          status: true,
        },
        component: MemoSegregationsComponent,
      },
      {
        path: 'preposition',
        data: {
          title: 'Pre-Positioning',
          breadcrumb: true,
          status: true,
        },
        component: PrepositioningComponent,
      },
      {
        path: 'trade',
        data: {
          title: 'Market Trade Generator',
          breadcrumb: true,
          status: true,
        },
        component: TradeComponent,
      },
      {
        path: 'bilateral',
        component: BilateralComponent,
        data: {
          title: 'Bilateral Transactions',
          breadcrumb: true,
          status: false,
        },
        pathMatch: 'prefix',
        children: [
          {
            path: '',
            redirectTo: '/transaction/bilateral/order',
            pathMatch: 'full',
          },
          {
            path: 'order',
            data: { title: 'Deliver Orders', breadcrumb: false, status: true },
            component: OrdersComponent,
          },
          {
            path: 'delivery',
            data: {
              title: 'Receiver Authorized Delivery',
              breadcrumb: false,
              status: true,
            },
            component: DeliveriesComponent,
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
export class TransactionRoutingModule {}
