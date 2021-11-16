import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreFacade } from 'ion-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  username = '';
  password = '';
  timeout: number;
  returnUrl: string;

  isAuthenticating$ = this.facade.isAuthenticating();

  constructor(
    private activatedRoute: ActivatedRoute,
    private facade: CoreFacade
  ) {
    this.returnUrl =
      // tslint:disable-next-line:no-string-literal
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    // timeout due to dtcc-textbox two way binding sync delay on focusout
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.facade.login(this.username, this.password, this.returnUrl);
    }, 200);
  }
}
