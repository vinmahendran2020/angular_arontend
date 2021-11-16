import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ionDate' })
export class IonDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    return !isNaN(date.getTime())
      ? `${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date
          .getDate()
          .toString()
          .padStart(2, '0')}/${date.getFullYear()}`
      : '';
  }
}
