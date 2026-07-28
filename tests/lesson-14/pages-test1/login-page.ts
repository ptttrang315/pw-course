import { Page, Locator } from "@playwright/test";

export class LoginPage {
    page: Page;
    readonly userField: Locator;
    readonly pwdField: Locator;
    readonly loginBtn: Locator;
    readonly wpLoginLogo: Locator;

    constructor(page:Page) {
        this.page = page;
        this.userField = page.getByRole('textbox', { name: 'Username or Email Address' });
        this.pwdField = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Log In' });
        this.wpLoginLogo = page.getByRole('link', { name: 'Powered by WordPress' });
    }

    navigeToLoginPage = async () => {
        await this.page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin')
    }

    login = async (username: string, password: string) => {
        await this.userField.fill(username);
        await this.pwdField.fill(password);
        await this.loginBtn.click();
    }
}