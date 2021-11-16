import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ionCurrencyPipe' })
export class IonCurrencyPipe implements PipeTransform {
  private static readonly DECIMAL_SEPARATOR = '.';
  private static readonly THOUSANDS_SEPARATOR = ',';
  private static readonly SYMBOL = '$';
  private static readonly PADDING = '000000';

  transform(value: number | string, fractionSize: number = 0): string {
    let [integer, fraction = ''] = (value || '0')
      .toString()
      .split(IonCurrencyPipe.DECIMAL_SEPARATOR);
    fraction =
      fractionSize > 0
        ? IonCurrencyPipe.DECIMAL_SEPARATOR +
          (fraction + IonCurrencyPipe.PADDING).substring(0, fractionSize)
        : '';
    integer = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      IonCurrencyPipe.THOUSANDS_SEPARATOR
    );

    return IonCurrencyPipe.SYMBOL + integer + fraction;
  }
}
