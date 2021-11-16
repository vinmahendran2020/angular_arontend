import { by, element, ElementFinder } from 'protractor';

export class DashboardPage {

  async getDashboardPage(): Promise<ElementFinder> {
    return element(by.className('dashboard-container'));
  }
}
