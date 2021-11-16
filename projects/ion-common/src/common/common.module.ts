import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { IonSharedModule } from 'ion-shared';
import { IonCoreModule } from 'ion-core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers/common.reducer';

import { CusipService } from './service/cusip.service';
import { CusipFacade } from './facade/cusip.facade';
import { CusipEffects } from './store/effects/cusip.effects';

import { TickerService } from './service/ticker.service';
import { TickerFacade } from './facade/ticker.facade';
import { TickerEffects } from './store/effects/ticker.effects';

import { IonCurrencyPipe } from './pipe/ion-currency.pipe';
import { IonNumberPipe } from './pipe/ion-number.pipe';
import { IonDatePipe } from './pipe/ion-date.pipe';

import { ReportCardComponent } from './view/report-card/report-card.component';
import { SearchboxComponent } from './view/searchbox/searchbox.component';
import { TickerDialogComponent } from './view/ticker-dialog/ticker-dialog.component';
import { CusipDialogComponent } from './view/cusip-dialog/cusip-dialog.component';
import { RadioButtonRendererComponent } from './view/renderer/radio-button-renderer.component';
import { ErrorMessageComponent } from './view/error-message/error-message.component';
import { SuccessMessageComponent } from './view/success-message/success-message.component';

import { FormComponent } from './view/form/form.component';
import { FormItemComponent } from './view/form-item/form-item.component';

@NgModule({
  declarations: [
    ReportCardComponent,
    SearchboxComponent,
    TickerDialogComponent,
    CusipDialogComponent,
    RadioButtonRendererComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    IonDatePipe,
    FormComponent,
    FormItemComponent,
  ],
  imports: [
    CommonModule,
    IonSharedModule,
    IonCoreModule,
    StoreModule.forFeature('common', reducers),
    EffectsModule.forFeature([CusipEffects, TickerEffects]),
  ],
  exports: [
    ReportCardComponent,
    SearchboxComponent,
    TickerDialogComponent,
    CusipDialogComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    IonDatePipe,
    FormComponent,
    FormItemComponent,
  ],
  providers: [
    CusipFacade,
    CusipService,
    TickerFacade,
    TickerService,
    IonCurrencyPipe,
    IonNumberPipe,
    DecimalPipe,
    IonDatePipe,
  ],
})
export class IonCommonModule {}
