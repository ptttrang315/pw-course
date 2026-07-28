import { Page, Locator } from '@playwright/test'

export class MaterialPage {
    page: Page;

    pageName = (name: string) => {
        return this.page.getByRole('link', {name: name});
    }

    constructor(page: Page){
        this.page = page;
    }

    goToPage = async (name: string) => {
        await this.page.goto('https://material.playwrightvn.com/');
        await this.pageName(name).click();
    }
}