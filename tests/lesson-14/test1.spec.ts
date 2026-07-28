import { expect, test } from '@playwright/test';
import { LoginPage } from './pages-test1/login-page';
import { DashboardPage } from './pages-test1/dashboard-page';
import { TagsPage } from './pages-test1/tags-page';

const user = 'betterbytes.academy.admin';
const pwd = 'StrongPass@BetterBytesAcademy';

test.use({
    video: 'on'
});

test('Test-01: Take screenshots, mask elements', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const tagsPage = new TagsPage(page);

    await test.step('Go to page', async () => {
        await loginPage.navigeToLoginPage();
        await expect(loginPage.wpLoginLogo).toBeVisible();
    });

    await test.step('Login', async () => {
        await loginPage.login(user, pwd);
        await expect(dashboardPage.navBar('Dashboard')).toBeVisible();
    });

    await test.step('Take screenshot and mask blocks', async () => {
        await expect(page).toHaveScreenshot({
            mask:[
                dashboardPage.blockGlance,
                dashboardPage.blockActivity
            ],
            maskColor: '#7134eb'
        })
    });

    await test.step('Take full screenshot page in Tag page', async () => {
        await tagsPage.goToTagsPage();
        expect(tagsPage.tagsHeading).toBeVisible();

        await expect(page).toHaveScreenshot({
            mask:[
                tagsPage.tagsList
            ],
            fullPage: true
            })

    });    


})