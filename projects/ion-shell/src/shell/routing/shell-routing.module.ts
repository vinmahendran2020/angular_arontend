import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonAuthModule } from 'ion-auth';

import { LayoutComponent } from '../view/layout/layout.component';
import { CanActivateAuthorizedRoute } from './CanActivateAuthorizedRoute';
import { CanActivateLoginRoute } from './CanActivateLoginRoute';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => IonAuthModule,
    pathMatch: 'full',
    canActivate: [CanActivateLoginRoute],
  },
  {
    path: '',
    redirectTo: '/dashboard/position',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    data: { title: 'ION', breadcrumb: false, status: false },
    pathMatch: 'prefix',
    canActivate: [CanActivateAuthorizedRoute],
    children: [
      {
        path: 'dashboard',
        data: { title: 'Dashboard', breadcrumb: true, status: true },
        loadChildren: () =>
          import('ion-dashboard').then((m) => m.IonDashboardModule),
      },
      {
        path: 'admin',
        data: { title: 'Admin Portal', breadcrumb: true, status: true },
        loadChildren: () => import('ion-admin').then((m) => m.IonAdminModule),
      },
      {
        path: 'transaction',
        data: {
          title: 'Transaction Submission',
          breadcrumb: true,
          status: false,
        },
        loadChildren: () =>
          import('ion-transaction').then((m) => m.IonTransactionModule),
      },
      {
        path: 'settlement',
        data: {
          title: 'Settlement Activity',
          breadcrumb: true,
          status: false,
        },
        loadChildren: () =>
          import('ion-settlement').then((m) => m.IonSettlementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateLoginRoute, CanActivateAuthorizedRoute],
})
export class ShellRoutingModule {}
