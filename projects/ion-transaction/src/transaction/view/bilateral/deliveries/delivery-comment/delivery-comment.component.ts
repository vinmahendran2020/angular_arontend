import {
  Component,
  Input,
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-delivery-comment',
  templateUrl: './delivery-comment.component.html',
  styleUrls: ['./delivery-comment.component.css'],
})
export class DeliveryCommentComponent {
  @Input()
  comment = '';
}
