import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonShellModule } from 'ion-shell';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => IonShellModule,
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
