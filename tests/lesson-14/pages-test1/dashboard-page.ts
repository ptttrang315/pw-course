import { Page, Locator } from "@playwright/test";
import { LoginPage } from "./login-page";

export class DashboardPage extends LoginPage {
    readonly blockGlance: Locator;
    readonly blockActivity: Locator;

    constructor(page: Page) {
        super(page);

        this.blockGlance = this.page.locator('#dashboard_right_now');
        this.blockActivity = this.page.locator('#dashboard_activity');
    }

    navBar(name: string): Locator {
        return this.page.getByRole('heading', { name: name})
    }
}