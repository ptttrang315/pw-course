import { Page, Locator } from '@playwright/test'

export class MaterialBasePage {
    page: Page;

    pageName(name: string): Locator { 
        return this.page.getByRole('link', {name: `${name}`})
    };

    heading(name: string, level: number): Locator {
        return this.page.getByRole('heading', {name: `${name}`, level: level});
    }
    
    constructor(page: Page){
        this.page = page;
    }

    async openMaterialPage() {
        await this.page.goto('https://material.playwrightvn.com/');
    };

    async gotoPage(name: string) {
        await this.pageName(name).click();
    };
    
}
