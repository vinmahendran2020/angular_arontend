import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-order-comment',
  templateUrl: './order-comment.component.html',
  styleUrls: ['./order-comment.component.css'],
})
export class OrderCommentComponent implements OnChanges {
  @Input()
  comment = '';

  @Output()
  edited = new EventEmitter<string>();

  editable = true;

  ngOnChanges(): void {
    this.editable = !(this.comment?.length > 0);
  }

  edit(): void {
    this.editable = true;
  }

  onCommentChange(comment: string): void {
    this.comment = comment;
  }

  submit(): void {
    this.edited.emit(this.comment);
  }
}
