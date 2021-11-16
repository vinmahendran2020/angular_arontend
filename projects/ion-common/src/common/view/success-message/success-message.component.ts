import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css'],
})
export class SuccessMessageComponent {
  @Input()
  message: string;

  @Input()
  showClose = false;

  // tslint:disable-next-line:no-output-native
  @Output()
  close = new EventEmitter<string>();

  closeMessage(): void {
    this.close.emit();
  }
}
