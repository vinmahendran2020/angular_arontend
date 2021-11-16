import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent {
  @Input()
  message: string;

  @Input()
  showClose = true;

  // tslint:disable-next-line:no-output-native
  @Output()
  close = new EventEmitter<string>();

  closeMessage(): void {
    this.close.emit();
  }
}
