import {test, expect, Page} from '@playwright/test'
// Element - Data Test - Function 
//Element of user page
const newUserElement = {
    newUser: 'input#user_login',
    newEmail: 'input#email',
    firstName: 'input#first_name',
    lastName: 'input#last_name',
    newPwd: 'input#pass1',
}

// Element of navigation bar
const navBarItemsEle = 'ul#adminmenu div.wp-menu-name';
// Use for get list names of navigation bar => should not update to Playwright selector
//===============================================================================
// Login info
const adminUser = 'betterbytes.academy.admin';
const adminPwd = 'StrongPass@BetterBytesAcademy';

//===============================================================================
// function of login page
 
async function login(page: Page, username: string, password: string) {
    await page.getByRole('textbox', {name:'Username or Email Address'}).fill(username);
    await page.getByRole('textbox', {name:'Password'}).fill(password);
    await page.getByRole('button', {name: 'Log In'}).click();
    await page.waitForURL(/wp-admin/);
    await expect(page.getByRole('menuitem', {name: 'Playwright practice site'})).toBeVisible();
}

async function navigateToUsers(page: Page) {
    await page.getByRole('link', { name: 'Users' }).first().click();
}

// function of user page
async function verifyUserHeadingVisible(page: Page) {
    await expect(page.getByRole('heading', { name: 'Users',level: 1})).toBeVisible();
}
interface NewUserInfo {
    newUser: string;
    newEmail: string;
    firstName: string;
    lastName: string;
    newPwd: string;
}

function createUserInfo(tcID: string): NewUserInfo {
    return {
        newUser: `E101_Trang_${tcID}`,
        newEmail: `trang_${tcID}@mail.com`,
        firstName: 'E101',
        lastName: 'Trang',
        newPwd: 'test@auto@123'
    };

}

async function verifyAddUserEnabled(page: Page) {
    await expect(page.getByRole('main').getByRole('link', { name: 'Add User' })).toBeEnabled();
}

async function addUserWithRole(page: Page, role: string, newUserInfo: NewUserInfo) {
    await page.getByRole('main').getByRole('link', { name: 'Add User' }).click();

    await expect(page.getByRole('heading', { name: 'Add User',level: 1})).toBeVisible();
    
    for(const key in newUserInfo){
        await page.locator(newUserElement[key as keyof typeof newUserElement]).fill(newUserInfo[key as keyof typeof newUserInfo]);
    }
    
    await page.getByRole('combobox').selectOption({label: role});
    await page.getByRole('button', {name: 'Add User'}).click();        
}  

async function verififyNewUserCreated(page: Page) {
    await expect(page.getByText('New user created.')).toBeVisible();
}
// function for logout
async function logout(page: Page){
    await page.getByRole('menuitem', {name: 'Howdy,'}).hover();
    await page.getByRole('menuitem', {name: 'Log Out'}).click();
}

// function check navigation bar
async function checkExpectedNavigationBar(page: Page, expectedMenu: string[]){
    const menuList = await page.locator(navBarItemsEle).allTextContents();
    for (const item of expectedMenu) {
        expect(
            menuList.some(menu => menu.includes(item))
        ).toBeTruthy();
    }
}

async function checkUnexpectedNavigationBar(page: Page, unexpectedMenu: string[]){
    const menuList = await page.locator(navBarItemsEle).allTextContents();
    for (const item of unexpectedMenu) {
        expect(
            menuList.some(menu => menu.includes(item))
        ).toBeFalsy();
    }
}

// filtering function
async function filterUser(page: Page, newUser: string){
    await page.getByRole('searchbox', { name: 'Search Users:' }).fill(newUser);
    await page.getByRole('button', { name: 'Search Users' }).click();
}

// function for delete user
async function deleteUser(page: Page, newUser: string) {
    const userNameRowEle = page.locator('[data-colname="Username"]').getByText(newUser);
    await page.getByRole('link', { name: 'Users' }).first().click();
    await filterUser(page, newUser);
    await expect(userNameRowEle).toBeVisible();
    await userNameRowEle.hover();
    await page.getByRole('link', { name: 'Delete' }).click()
    // Check user befor deleting
    await expect(page.getByRole('heading', { name: 'Delete Users',level: 1})).toBeVisible();
    // Select content and confirm deletion
    const checkbox = page.getByRole('radio', {name: 'Delete all content'});
    if (await checkbox.count() > 0) {
        await checkbox.check();
    }
    await page.getByRole('button', { name: 'Confirm Deletion' }).click();
}

async function verifyUserIsDeleted(page: Page, deletedUser: string, msg: string){
    await expect(page.getByText('User deleted.')).toBeVisible();
    await filterUser(page, deletedUser);
    await expect(page.getByRole('cell', { name: `${msg}` })).toBeVisible();
}
//===============================================================================
// Test data
const roles = [
    {
        tc_ID: '001',
        role: 'Editor',
        expectedMenu: ['Dashboard', 'Posts', 'Media', 'Pages', 'Comments', 'Profile', 'Tools'],
        unexpectedMenu: ['Appearance', 'Users', 'Plugins']
    },
    {
        tc_ID: '002',
        role: 'Subscriber',
        expectedMenu: ['Dashboard', 'Profile'],
        unexpectedMenu: ['Posts', 'Media', 'Pages', 'Comments', 'Appearance', 'Users', 'Plugins']
    }
];

//===============================================================================

test.describe('ACCOUNT - Account', () => {
    let newUserInfo: NewUserInfo;

    test.beforeEach('Login page with admin account', async ({page}) => {
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
        await login(page, adminUser, adminPwd);

    });

    test.afterEach('Login to admin and delete new account', async ({page}) => {
        await logout(page);
        await login(page, adminUser, adminPwd);
        await navigateToUsers(page);
        await deleteUser(page, newUserInfo.newUser);
        await verifyUserIsDeleted(page, newUserInfo.newUser, 'No users found.')
    });

    for (const data of roles) {
        test(`@ACC_${data.tc_ID}: Create account with ${data.role} permisson`, async ({page}) => {
            newUserInfo = createUserInfo(data.tc_ID);

            await test.step('Go to Users screen', async () => {
                await navigateToUsers(page);
                await verifyUserHeadingVisible(page);
                await verifyAddUserEnabled(page);
            });

            await test.step(`Add new user with ${data.role} role`, async () => {
                await addUserWithRole(page, data.role, newUserInfo);
                await verififyNewUserCreated(page);
            });

            await test.step(`Log out and relogin with new user`,async () => {                
                await logout(page);
                await login(page, newUserInfo.newUser, newUserInfo.newPwd);
                await checkExpectedNavigationBar(page, data.expectedMenu);
                await checkUnexpectedNavigationBar(page, data.unexpectedMenu);
                console.log('Expected menu ', data.expectedMenu);
                console.log('Unexpected menu ', data.unexpectedMenu)
            });            
        });
    }
});