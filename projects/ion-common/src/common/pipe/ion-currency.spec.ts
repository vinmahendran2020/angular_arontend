import { IonCurrencyPipe } from './ion-currency.pipe';

describe('IonCurrencyPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new IonCurrencyPipe();

  it('transforms number 1000 to $1,000.0 with fraction', () => {
    expect(pipe.transform(1000, 1)).toBe('$1,000.0');
  });

  it('transforms number 1000 to $1,000 without fraction', () => {
    expect(pipe.transform(1000)).toBe('$1,000');
  });

  it('transforms number 10000 to $10,000.0', () => {
    expect(pipe.transform(10000, 1)).toBe('$10,000.0');
  });

  it('transforms number 1000.4323 to $1,000.43 with fraction', () => {
    expect(pipe.transform(1000.4323, 2)).toBe('$1,000.43');
  });

  it('transforms number 1000.4323 to $1,000 without fraction', () => {
    expect(pipe.transform(1000.4323)).toBe('$1,000');
  });

  it('transforms number 10000.4323 to $10,000.4', () => {
    expect(pipe.transform(10000.4323, 1)).toBe('$10,000.4');
  });

  it('transforms string 1000 to $1,000 without fraction', () => {
    expect(pipe.transform('1000')).toBe('$1,000');
  });

  it('transforms string 10000 to $10,000.0', () => {
    expect(pipe.transform('10000', 1)).toBe('$10,000.0');
  });

  it('transforms string 1000.4323 to $1,000.43 with fraction', () => {
    expect(pipe.transform('1000.4323', 2)).toBe('$1,000.43');
  });

  it('transforms handles empty input', () => {
    expect(pipe.transform(null, 2)).toBe('$0.00');
  });
});
