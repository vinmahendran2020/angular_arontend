import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './routing/shell-routing.module';

import { IonSharedModule } from 'ion-shared';
import { IonAuthModule } from 'ion-auth';
import { IonCommonModule } from 'ion-common';

import { LayoutComponent } from './view/layout/layout.component';
import { HeaderComponent } from './view/header/header.component';
import { ScheduleComponent } from './view/schedule/schedule.component';
import { StatusComponent } from './view/status/status.component';
import { FooterComponent } from './view/footer/footer.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ShellService } from './service/shell.service';
import { ShellEffects } from './store/effects/shell.effects';
import { ShellFacade } from './facade/shell.facade';
import { reducer } from './store/reducers/shell.reducer';

import { NgIdleModule } from '@ng-idle/core';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ScheduleComponent,
    StatusComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    IonSharedModule,
    IonAuthModule,
    IonCommonModule,
    StoreModule.forFeature('shell', reducer),
    EffectsModule.forFeature([ShellEffects]),
    NgIdleModule.forRoot()
  ],
  providers: [Title, ShellService, ShellFacade],
})
export class IonShellModule {}
