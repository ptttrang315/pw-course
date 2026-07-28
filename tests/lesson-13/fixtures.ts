import { test as base, expect } from '@playwright/test';
import { MaterialPage } from './pages/material-page';

type Fixture = {
    materialPage: MaterialPage;
}

export const test = base.extend <Fixture> ({
    materialPage : async ({page}, use) => {
        const materialPage = new MaterialPage(page);

        // setup
        await materialPage.openMaterialPage();
        await expect(materialPage.heading('Tài liệu học automation test', 1)).toBeVisible();

        await use(materialPage);
        
        // teardown
        console.log('End of test')
    },
})

export { expect };
