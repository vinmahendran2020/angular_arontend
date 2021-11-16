import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css'],
})
export class ReportCardComponent implements OnChanges {
  @Input() title: string;
  @Input() amount: number;
  @Input() toolTip: string;
  @Input() tooltipPlacement: string;
  @Input() direction: string;
  @Input() prefix = '';
  @Input() format = '1.0-3';

  negative: boolean;
  absValue: string;

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnChanges(): void {
    if (this.amount === null || this.amount === undefined) {
      this.absValue = '-';
      this.amount = 0;
    } else {
      this.absValue = this.decimalPipe
        .transform(Math.abs(this.amount), this.format)
        .toString();
    }
    this.negative = this.amount < 0;
  }
}
