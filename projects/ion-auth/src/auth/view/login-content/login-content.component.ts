import { Component } from '@angular/core';
import { CoreFacade } from 'ion-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css'],
})
export class LoginContentComponent {
  hasError$ = this.facade.getAuthError();

  constructor(private facade: CoreFacade) {}
}
