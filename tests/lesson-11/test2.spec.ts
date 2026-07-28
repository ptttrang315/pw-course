import { expect, test } from '@playwright/test';
import { ApiUtils } from './utils/api';
import { adminInfo } from './data-test/login-data';
import { UserInfo, user1 } from './data-test/user-data';

let token: string;
let userID: number;

test.beforeEach('Login admin account', async ({request}) => {
    const apiUtils = new ApiUtils(request);
    const response = await apiUtils.login(adminInfo.email, adminInfo.pwd);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    token = response.body.data.token;
})

test.afterEach('Delete the new added user', async ({request}) => {
    if (userID) {
        const apiUtils = new ApiUtils(request);
        const response = await apiUtils.deleteUser(userID, token);

        expect(response.status).toBe(200);
        console.log(response.body.deleted.message);
    }
})

test('Create user success', async ({request}) => {
    const apiUtils = new ApiUtils(request);

    await test.step('Step 1: Create a new user successfully', async () => {
        const response = await apiUtils.createUser(user1, token);
        
        expect(response.status).toBe(201);
        console.log('Created user: ', response.body);

        userID = response.body.user.id;
    });

    await test.step('Step 2: Get user from user list', async () => {
        const response = await apiUtils.getUser(token);
        expect(response.status).toBe(200);

        console.log('List of users: ', response.body.users);

        const listUsers = response.body.users as UserInfo[];
        const isUserInList = listUsers.some(user => user.name === user1.name && user.email === user1.email )
    
        expect(isUserInList).toBeTruthy();
    })
});