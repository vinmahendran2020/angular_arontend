import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './routing/admin-routing.module';

import { IonSharedModule } from 'ion-shared';
import { IonAuthModule } from 'ion-auth';
import { IonCommonModule } from 'ion-common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AdminFacade } from './facade/admin.facade';
import { AdminEffects } from './store/effects/admin.effects';

import { reducers } from './store/reducers/admin.reducer';

import { NettingFacade } from './facade/netting.facade';
import { NettingEffects } from './store/effects/netting.effects';

import { SecurityFacade } from './facade/security.facade';
import { SecurityEffects } from './store/effects/security.effects';

import { ScheduleService } from './service/schedule.service';
import { CashFacade } from './facade/cash.facade';
import { CashEffects } from './store/effects/cash.effects';

import { StartFacade } from './facade/start.facade';
import { StartEffects } from './store/effects/start.effects';

import { EndFacade } from './facade/end.facade';
import { EndEffects } from './store/effects/end.effects';

import { DailyProcessComponent } from './view/daily-process/daily-process.component';
import { StartOfDayComponent } from './view/start-of-day/start-of-day.component';
import { EndOfDayComponent } from './view/end-of-day/end-of-day.component';


import { AdminComponent } from './view/admin/admin.component';
import { NettingComponent } from './view/netting/netting.component';
import { ScheduleStatusComponent } from './view/schedule/status/schedule-status.component';
import { ScheduleViewerComponent } from './view/schedule/viewer/schedule-viewer.component';
import { DailyScheduleViewerComponent } from './view/schedule/viewer/daily-schedule-viewer/daily-schedule-viewer.component';

import { ScheduleEditorComponent } from './view/schedule/editor/schedule-editor.component';
import { DailyScheduleEditorComponent } from './view/schedule/editor/daily-schedule-editor/daily-schedule-editor.component';

import { SettlementComponent } from './view/settlement/settlement.component';
import { SecurityComponent } from './view/security/security.component';
import { CashComponent } from './view/cash/cash.component';



@NgModule({
  declarations: [
    AdminComponent,
    NettingComponent,
    ScheduleStatusComponent,
    ScheduleViewerComponent,
    ScheduleEditorComponent,
    DailyScheduleViewerComponent,
    DailyScheduleEditorComponent,
    SettlementComponent,
    SecurityComponent,
    CashComponent,
    DailyProcessComponent,
    StartOfDayComponent,
    EndOfDayComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonSharedModule,
    IonAuthModule,
    IonCommonModule,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([
      AdminEffects,
      NettingEffects,
      CashEffects,
      SecurityEffects,
      StartEffects,
      EndEffects
    ]),
  ],
  providers: [
    AdminFacade,
    NettingFacade,
    CashFacade,
    SecurityFacade,
    ScheduleService,
    EndFacade,
    StartFacade
  ],
})
export class IonAdminModule {}
