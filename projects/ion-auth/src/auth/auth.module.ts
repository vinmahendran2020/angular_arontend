import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './routing/auth-routing.module';

import { LoginComponent } from './view/login/login.component';
import { LoginHeaderComponent } from './view/login-header/login-header.component';
import { LoginContentComponent } from './view/login-content/login-content.component';
import { LoginFormComponent } from './view/login-form/login-form.component';
import { LoginFooterComponent } from './view/login-footer/login-footer.component';
import { LoginErrorComponent } from './view/login-error/login-error.component';
import { SessionTimeoutComponent } from './view/session-timeout/session-timeout.component';

import { IonSharedModule } from 'ion-shared';
import { IonCoreModule } from 'ion-core';

@NgModule({
  declarations: [
    LoginComponent,
    LoginHeaderComponent,
    LoginContentComponent,
    LoginFormComponent,
    LoginFooterComponent,
    LoginErrorComponent,
    SessionTimeoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonSharedModule,
    IonCoreModule,
  ],
  exports: [SessionTimeoutComponent],
  providers: [Title],
})
export class IonAuthModule {}
