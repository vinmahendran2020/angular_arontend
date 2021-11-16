import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ionNumberPipe' })
export class IonNumberPipe implements PipeTransform {
  private static readonly THOUSANDS_SEPARATOR = ',';

  transform(value: number | string): string {
    let integer = (value || '').toString();
    integer = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      IonNumberPipe.THOUSANDS_SEPARATOR
    );
    return integer;
  }
}
