import { Component } from '@angular/core';
import { CoreFacade } from 'ion-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.css'],
})
export class LoginErrorComponent {
  constructor(private facade: CoreFacade) {}

  close(): void {
    this.facade.closeError();
  }
}
