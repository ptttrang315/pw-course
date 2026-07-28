import {test, expect} from '@playwright/test'

const invalidUser = 'practice';
const invalidPwd = 'test123';
const validUser = 'betterbytes.academy.admin';
const validPwd = 'StrongPass@BetterBytesAcademy';

test.describe('AUTH - Authentication', () => {
    test.beforeEach(async ({page}) => {
        await test.step('Go to login page', async () => {
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin')
        
            await expect(page.getByRole('link', { name: 'Powered by WordPress' })).toBeVisible();
        });
    });

    test('@AUTH_001: Login fail', async ({page}) => {
        await test.step('Input invalid username and password', async () => {
            await page.getByRole('textbox', {name:'Username or Email Address'}).fill(invalidUser);
            await page.getByRole('textbox', {name:'Password'}).fill(invalidPwd);
            
            await expect(page.getByRole('textbox', {name:'Username or Email Address'})).toHaveValue(invalidUser);
            await expect(page.getByRole('textbox', {name:'Password'})).toHaveValue(invalidPwd);
        });

        await test.step('Click on login button', async () => {
            await page.getByRole('button', {name: 'Log In'}).click();

            await expect(page.getByText('Error: The username')).toBeVisible();
        });
    });

    test('@AUTH_002 - Login success', async ({page}) => {
        await test.step('Input valid username and password', async () => {
            await page.getByRole('textbox', {name:'Username or Email Address'}).fill(validUser);
            await page.getByRole('textbox', {name:'Password'}).fill(validPwd);

            await expect(page.getByRole('textbox', {name:'Username or Email Address'})).toHaveValue(validUser);
            await expect(page.getByRole('textbox', {name:'Password'})).toHaveValue(validPwd);
        });

        await test.step('Click on login button', async () => {
            await page.getByRole('button', {name: 'Log In'}).click();

            await expect(page).toHaveURL(/wp-admin/)
            await expect(page.getByRole('heading', { name: 'Dashboard',level: 1})).toBeVisible();
            await expect(page.getByRole('heading', { name: 'At a Glance',level: 2})).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Activity',level: 2})).toBeVisible();
    
        });
    });
});    