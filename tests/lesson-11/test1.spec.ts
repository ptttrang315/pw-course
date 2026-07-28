import { test, expect } from '@playwright/test';
import { ApiUtils } from './utils/api';
import { adminInfo, userInfo } from './data-test/login-data';

test('Test1: Login successfully', async ({request}) => {
    const apiUtils = new ApiUtils (request);

    const accounts = [
        { step: 'Step 1', user: adminInfo },
        { step: 'Step 2', user: userInfo }
    ]

    for (let account of accounts ){
    await test.step(`${account.step} : Login ${account.user.role} account successfully`, async () => {
        const response = await apiUtils.login(account.user.email, account.user.pwd);
        const status = response.status;
        const body = response.body;

        expect(status).toBe(200);
        expect(body.success).toBe(true);

        const accessToken = body.data.token;

        console.log(`Status Code: ${status}`);
        console.log(`Access token: ${accessToken}`);
    });
    }
});
