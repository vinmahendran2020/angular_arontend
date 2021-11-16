import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { CoreFacade } from 'ion-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css'],
})
export class SessionTimeoutComponent implements OnInit {
  modalOptions = {
    class: 'medium-dialog',
  };

  idle$ = new Subject<boolean>();

  countdown$ = this.idle.onTimeoutWarning;

  constructor(private idle: Idle, private facade: CoreFacade) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(15 * 60);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleStart.subscribe(() => {
      this.idle$.next(true);
    });
    idle.onIdleEnd.subscribe(() => {
      this.idle$.next(false);
    });
    idle.onTimeout.subscribe(() => {
      this.idle$.next(false);
    });
  }

  ngOnInit(): void {
    this.idle.watch();
  }

  close(): void {
    this.idle$.next(false);
    this.facade.logout();
  }
}
