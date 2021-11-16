import { browser, protractor, logging } from 'protractor';
import { LoginPage } from './login.po';
import { DashboardPage } from './dashboard.po';

describe('ION PROJECT', () => {
    let page: LoginPage;
    const EC = protractor.ExpectedConditions;

    beforeEach(() => {
        page = new LoginPage();
    });

    // afterEach(async () => {
    //     // Assert that there are no errors emitted from the browser
    //     const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    //     expect(logs).not.toContain(
    //         jasmine.objectContaining({
    //             level: logging.Level.SEVERE,
    //         } as logging.Entry)
    //     );
    // });

    it('should have display ion login page', async () => {
        await page.navigateTo();
        expect(await page.getInitialText()).toEqual('Login to your account');
    });

    it('should have correct label name and button text', async () => {
        expect(await page.getUsernameLabel()).toEqual('Username');
        expect(await page.getPasswordLabel()).toEqual('Password');
        expect(await page.login().then((obj) => obj.getText())).toEqual('Login');
    });

    it('should display an error message to the user if they provided incorrect credentials', async () => {
        await page.trySignIn('jeeva', '*****')
        browser.wait(EC.visibilityOf(await page.getLoginErrorScreen()));
        expect(await page.getLoginErrorMessage()).toEqual('You have entered an invalid Username or Password. Please re-enter your user information.');
    });

    it('should redirect the user to the dashboard page if they provided correct credentials', async () => {
        let dashboardPage = new DashboardPage();
        await page.trySignIn('vmohanra', 'P@ssw0rd');
        browser.wait(EC.visibilityOf(await dashboardPage.getDashboardPage()));
        expect(await dashboardPage.getDashboardPage().then((obj) => obj.getText())).toEqual('ION Dashboard Placeholder');
    });
});
