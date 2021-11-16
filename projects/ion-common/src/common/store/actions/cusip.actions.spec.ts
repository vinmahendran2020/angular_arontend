import * as Actions from './cusip.actions';

describe('CusipActions', () => {
  it('testing CusipSecurityNameChange action', () => {
    const securityNameChange = new Actions.CusipSecurityNameChange('security');
    expect(securityNameChange).toBeTruthy();
    expect(securityNameChange.type).toBe(Actions.CusipSecurityNameChange.Type);
  });

  it('testing CusipIssuerNameChange action', () => {
    const issuerNameChange = new Actions.CusipIssuerNameChange('issuer');
    expect(issuerNameChange).toBeTruthy();
    expect(issuerNameChange.type).toBe(Actions.CusipIssuerNameChange.Type);
  });

  it('testing CusipTickerChange action', () => {
    const cusipNameChange = new Actions.CusipTickerChange('cusip');
    expect(cusipNameChange).toBeTruthy();
    expect(cusipNameChange.type).toBe(Actions.CusipTickerChange.Type);
  });

  it('testing CusipSearch action', () => {
    const cusipSearch = new Actions.CusipSearch();
    expect(cusipSearch).toBeTruthy();
    expect(cusipSearch.type).toBe(Actions.CusipSearch.Type);
  });

  it('testing CusipReset action', () => {
    const cusipReset = new Actions.CusipReset();
    expect(cusipReset).toBeTruthy();
    expect(cusipReset.type).toBe(Actions.CusipReset.Type);
  });

  it('testing CusipSearchFound action', () => {
    const cusipSearchFound = new Actions.CusipSearchFound({
      items: [
        {
          cusip: 'cusip',
          security: 'security',
          issuer: 'issuer',
          price: 0,
          selected: false,
        },
      ],
    });

    expect(cusipSearchFound).toBeTruthy();
    expect(cusipSearchFound.type).toBe(Actions.CusipSearchFound.Type);
    expect(cusipSearchFound.result.items[0].cusip).toBe('cusip');
    expect(cusipSearchFound.result.items[0].issuer).toBe('issuer');
    expect(cusipSearchFound.result.items[0].price).toBe(0);
    expect(cusipSearchFound.result.items[0].security).toBe('security');
  });

  it('testing CusipSearchError action', () => {
    const error = new Actions.CusipSearchError('cusip');
    expect(error).toBeTruthy();
    expect(error.type).toBe(Actions.CusipSearchError.Type);
  });

  it('testing CusipSearchBack action', () => {
    const cusipNameChange = new Actions.CusipSearchBack();
    expect(cusipNameChange).toBeTruthy();
    expect(cusipNameChange.type).toBe(Actions.CusipSearchBack.Type);
  });

  it('testing CusipErrorClear action', () => {
    const cusipErrorClear = new Actions.CusipErrorClear();
    expect(cusipErrorClear).toBeTruthy();
    expect(cusipErrorClear.type).toBe(Actions.CusipErrorClear.Type);
  });

  it('testing CusipSearchSelection action', () => {
    const tickerErrorClear = new Actions.CusipSearchSelection('cusip');
    expect(tickerErrorClear).toBeTruthy();
    expect(tickerErrorClear.type).toBe(Actions.CusipSearchSelection.Type);
    expect(tickerErrorClear.cusip).toBe('cusip');
  });
});
