import { reducers as adminReducers } from './admin.reducer';

describe('AdminReducers', () => {
  it('testing all reducers', () => {
    expect(adminReducers).toBeTruthy();
    expect(adminReducers.security).toBeTruthy();
    expect(adminReducers.netting).toBeTruthy();
    expect(adminReducers.cash).toBeTruthy();
  });
});
