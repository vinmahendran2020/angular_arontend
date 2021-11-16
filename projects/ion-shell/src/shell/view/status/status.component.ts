import { Component, Input } from '@angular/core';
import { ShellFacade } from '../../facade/shell.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-shell-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  lastUpdated$ = this.facade.getLastUpdated();

  @Input()
  title: string;

  error$ = this.facade.getError();

  success$ = this.facade.getSuccess();

  constructor(private facade: ShellFacade) {}

  refresh(): void {
    this.facade.refresh();
  }

  closeError(): void {
    this.facade.clearError();
  }

  closeSuccess(): void {
    this.facade.clearSuccess();
  }
}
