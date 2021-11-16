import { browser, element, by, ElementFinder, Key } from 'protractor';

export class LoginPage {

  async navigateTo(): Promise<void> {
    await browser.get(browser.baseUrl);
  }

  async getInitialText(): Promise<string> {
    return await element(by.css('ion-login-form .login-title')).getText();
  }

  async getUsernameLabel(): Promise<string> {
    return await element(by.css('dtcc-textbox[name="Username"] dtcc-form-label .uif-label-text')).getText();
  }

  async getPasswordLabel(): Promise<string> {
    return await element(by.css('dtcc-textbox[name="Password"] dtcc-form-label .uif-label-text')).getText();
  }

  async getUsernameInput(): Promise<ElementFinder> {
    return await element(by.css('dtcc-textbox[name="Username"] input'));
  }

  async getPasswordInput(): Promise<ElementFinder> {
    return await element(by.css('dtcc-textbox[name="Password"] input'));
  }

  async getLoginErrorMessage(): Promise<string> {
    return await element(by.css('ion-login-error .message')).getText();
  }

  async getLoginErrorScreen(): Promise<ElementFinder> {
    return await element(by.css('ion-login-error'))
  }

  async login(): Promise<ElementFinder> {
    return await element(by.className('login-button'));
  }

  async trySignIn(username: string, password: string): Promise<void> {
    await this.getUsernameInput().then((obj) => obj.clear().then(async () => await this.getUsernameInput().then((obj) => obj.sendKeys(username))));
    await this.getPasswordInput().then((obj) => obj.clear().then(async () => await this.getPasswordInput().then((obj) => obj.sendKeys(password))));
    await this.login().then((obj) => obj.click());
  }
}
