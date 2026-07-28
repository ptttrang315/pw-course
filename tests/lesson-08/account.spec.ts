import {test, expect, Page} from '@playwright/test'
// Element - Data Test - Function 
// Element of login page
const userNameEle = '//input[@id="user_login"]';
const pwdEle = '//input[@id="user_pass"]';
const loginBtnEle = '//input[@id="wp-submit"]'; 
const usersTabEle = '//*[@id="menu-users"]';
const alarmEle = '//div[@class="notice is-dismissible updated"]';

//Element of user page
const addUserBtn1Ele = '//a[@class="page-title-action" and text()="Add User"]';
const newUserElement = { 
    newUser:'//input[@id="user_login"]',
    newEmail: '//input[@id="email"]',
    firstName: '//input[@id="first_name"]',
    lastName: '//input[@id="last_name"]',
    newPwd: '//input[@id="pass1"]',
}
const roleEle = '//select[@id="role"]';
const addUserBtn2Ele = '//input[@id="createusersub"]';
const searchFieldEle = '//input[@id="user-search-input"]';
const searchBtnEle = '//input[@id="search-submit"]';
const deleteTxtEle = '//a[@class="submitdelete"]';
const tblMsgEle = '//tbody[@id="the-list"]//*[@class="colspanchange"]';

// Element of delete users page
const idUserEle = '//input[@name="users[]" and @type="hidden"]';
const contentDelRatioEle = '//input[@id="delete_option0"]';
const confirmDelBtnEle = '//input[@value="Confirm Deletion"]';

// Element of navigation bar
const navBarItemsEle = '//ul[@id="adminmenu"]//div[@class="wp-menu-name"]';

//===============================================================================

// Login info
const adminUser = 'betterbytes.academy.admin';
const adminPwd = 'StrongPass@BetterBytesAcademy';
// New user info

// profile 
const avatarEle = '//*[@class="menupop with-avatar"]';
const logoutBtn = '//*[@id="wp-admin-bar-logout"]';

//===============================================================================
// function of login page
 
async function login(page: Page, username: string, password: string) {
    await page.locator(userNameEle).fill(username);
    await page.locator(pwdEle).fill(password);
    await page.locator(loginBtnEle).click();
    
    await page.waitForURL(/wp-admin/);
    await expect(page.locator('//*[@id="wpadminbar"]')).toBeVisible();}

async function navigateToUsers(page: Page) {
    await page.locator(usersTabEle).click();
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
    await expect(page.locator(addUserBtn1Ele)).toBeEnabled();
}

async function addUserWithRole(page: Page, role: string, newUserInfo: NewUserInfo) {
    await page.locator(addUserBtn1Ele).click(); 

    await expect(page.getByRole('heading', { name: 'Add User',level: 1})).toBeVisible();
    
    for(const key in newUserInfo){
        await page.locator(newUserElement[key as keyof typeof newUserElement]).fill(newUserInfo[key as keyof typeof newUserInfo]);
    }
    
    await page.locator(roleEle).selectOption({label: role});
    await page.locator(addUserBtn2Ele).click();
        
}  

async function verififyNewUserCreated(page: Page) {
    await expect(page.locator(alarmEle)).toContainText('New user created.');
}
// function for logout
async function logout(page: Page){
    await page.locator(avatarEle).hover();
    await page.locator(logoutBtn).click();
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
    const userNameRowEle = `//*[@data-colname="Username"]//*[text() = "${newUser}"]`;
    await page.locator(searchFieldEle).fill(newUser);
    await page.locator(searchBtnEle).click();
}

// function for delete user
async function deleteUser(page: Page, newUser: string) {
    const userNameRowEle = `//*[@data-colname="Username"]//*[text() = "${newUser}"]`;
    await page.locator(usersTabEle).click();
    await filterUser(page, newUser);
    await expect(page.locator(userNameRowEle)).toBeVisible();
    await page.locator(userNameRowEle).hover();
    await page.locator(deleteTxtEle).click();
    // Check user befor deleting
    await expect(page.getByRole('heading', { name: 'Delete Users',level: 1})).toBeVisible();
    // await expect(page.locator(idUserEle)).toContainText(newUser);
    // Select content and confirm deletion
    const checkbox = page.locator(contentDelRatioEle);
    if (await checkbox.count() > 0) {
        await checkbox.check();
    }
    await page.locator(confirmDelBtnEle).click();
}

async function verifyUserIsDeleted(page: Page, deletedUser: string, msg: string){
    await expect(page.locator(alarmEle)).toContainText('User deleted.');
    await filterUser(page, deletedUser);
    await expect(page.locator(tblMsgEle)).toHaveText(msg);
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