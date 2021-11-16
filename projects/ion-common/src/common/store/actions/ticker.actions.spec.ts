import * as Actions from './ticker.actions';

describe('TickerActions', () => {
  it('testing TickerSecurityNameChange action', () => {
    const securityNameChange = new Actions.TickerSecurityNameChange('security');
    expect(securityNameChange).toBeTruthy();
    expect(securityNameChange.type).toBe(Actions.TickerSecurityNameChange.Type);
  });

  it('testing TickerIssuerNameChange action', () => {
    const issuerNameChange = new Actions.TickerIssuerNameChange('issuer');
    expect(issuerNameChange).toBeTruthy();
    expect(issuerNameChange.type).toBe(Actions.TickerIssuerNameChange.Type);
  });

  it('testing TickerCusipChange action', () => {
    const cusipNameChange = new Actions.TickerCusipChange('cusip');
    expect(cusipNameChange).toBeTruthy();
    expect(cusipNameChange.type).toBe(Actions.TickerCusipChange.Type);
  });

  it('testing TickerSearch action', () => {
    const cusipSearch = new Actions.TickerSearch();
    expect(cusipSearch).toBeTruthy();
    expect(cusipSearch.type).toBe(Actions.TickerSearch.Type);
  });

  it('testing TickerReset action', () => {
    const cusipReset = new Actions.TickerReset();
    expect(cusipReset).toBeTruthy();
    expect(cusipReset.type).toBe(Actions.TickerReset.Type);
  });

  it('testing TickerSearchFound action', () => {
    const cusipSearchFound = new Actions.TickerSearchFound({
      items: [
        {
          ticker: 'ticker',
          security: 'security',
          issuer: 'issuer',
          price: 0,
          selected: false,
        },
      ],
    });

    expect(cusipSearchFound).toBeTruthy();
    expect(cusipSearchFound.type).toBe(Actions.TickerSearchFound.Type);
    expect(cusipSearchFound.result.items[0].ticker).toBe('ticker');
    expect(cusipSearchFound.result.items[0].issuer).toBe('issuer');
    expect(cusipSearchFound.result.items[0].price).toBe(0);
    expect(cusipSearchFound.result.items[0].security).toBe('security');
  });

  it('testing TickerSearchError action', () => {
    const error = new Actions.TickerSearchError('cusip');
    expect(error).toBeTruthy();
    expect(error.type).toBe(Actions.TickerSearchError.Type);
  });

  it('testing TickerSearchBack action', () => {
    const tickerSearchBack = new Actions.TickerSearchBack();
    expect(tickerSearchBack).toBeTruthy();
    expect(tickerSearchBack.type).toBe(Actions.TickerSearchBack.Type);
  });

  it('testing TickerErrorClear action', () => {
    const tickerErrorClear = new Actions.TickerErrorClear();
    expect(tickerErrorClear).toBeTruthy();
    expect(tickerErrorClear.type).toBe(Actions.TickerErrorClear.Type);
  });

  it('testing TickerSearchSelection action', () => {
    const tickerErrorClear = new Actions.TickerSearchSelection('ticker');
    expect(tickerErrorClear).toBeTruthy();
    expect(tickerErrorClear.type).toBe(Actions.TickerSearchSelection.Type);
    expect(tickerErrorClear.ticker).toBe('ticker');
  });
});
