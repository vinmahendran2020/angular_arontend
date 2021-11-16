import { reducers as dashboardReducers } from './dashboard.reducer';

describe('DashboardReducers', () => {
  it('testing all reducers', () => {
    expect(dashboardReducers).toBeTruthy();
    expect(dashboardReducers.risk).toBeTruthy();
    expect(dashboardReducers.position).toBeTruthy();
    expect(dashboardReducers.obligation).toBeTruthy();
  });
});
