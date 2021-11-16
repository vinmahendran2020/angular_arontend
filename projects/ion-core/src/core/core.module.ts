import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonSharedModule } from 'ion-shared';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreFacade } from './facade/core.facade';
import { CoreService } from './service/core.service';
import { CoreEffects } from './store/effects/core.effects';

import { reducer } from './store/reducers/core.reducer';

import { CoreInterceptorModule } from './interceptor/core-interceptor.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreInterceptorModule,
    IonSharedModule,
    StoreModule.forFeature('core', reducer),
    EffectsModule.forFeature([CoreEffects]),
  ],
  exports: [CoreInterceptorModule],
  providers: [CoreFacade, CoreService],
})
export class IonCoreModule {}
