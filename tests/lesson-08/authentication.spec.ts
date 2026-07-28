import {test, expect} from '@playwright/test'

const userNameEle = '//input[@id="user_login"]';
const pwdEle = '//input[@id="user_pass"]';
const loginBtnEle = '//input[@id="wp-submit"]'; 
const loginErrEle = '//div[@id="login_error"]/p';


let invalidUser = 'practice';
let invalidPwd = 'test123';
const validUser = 'betterbytes.academy.admin';
const validPwd = 'StrongPass@BetterBytesAcademy';
const errText = `Error: The username ${invalidUser} is not registered on this site. If you are unsure of your username, try your email address instead.`

test.describe('AUTH - Authentication', () => {
    test.beforeEach(async ({page}) => {
        await test.step('Go to login page', async () => {
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin')
        
            await expect(page.locator('//h1[@class="wp-login-logo"]')).toBeVisible();
        });
    });
    
    test('@AUTH_001: Login fail', async ({page}) => {
        await test.step('Input invalid username and password', async () => {
            await page.locator(userNameEle).fill(invalidUser);
            await page.locator(pwdEle).fill(invalidPwd);

            await expect(page.locator(userNameEle)).toHaveValue(invalidUser);
            await expect(page.locator(pwdEle)).toHaveValue(invalidPwd);
        });

        await test.step('Click on login button', async () => {
            await page.locator(loginBtnEle).click();

            await expect(page.locator(loginErrEle)).toHaveText(errText);
        });
    });

    test('@AUTH_002 - Login success', async ({page}) => {
        await test.step('Input valid username and password', async () => {
            await page.locator(userNameEle).fill(validUser);
            await page.locator(pwdEle).fill(validPwd);

            await expect(page.locator(userNameEle)).toHaveValue(validUser);
            await expect(page.locator(pwdEle)).toHaveValue(validPwd);
        });

        await test.step('Click on login button', async () => {
            await page.locator(loginBtnEle).click();

            await expect(page).toHaveURL(/wp-admin/)
            await expect(page.getByRole('heading', { name: 'Dashboard',level: 1})).toBeVisible();
            await expect(page.getByRole('heading', { name: 'At a Glance',level: 2})).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Activity',level: 2})).toBeVisible();
    
        });
    });
});    