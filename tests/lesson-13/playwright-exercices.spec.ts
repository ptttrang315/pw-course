import { test } from '@playwright/test';

test('Test-01: Open 2 tabs', async ({context}) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('https://material.playwrightvn.com/');
    await page2.goto('https://e-commerce-dev.betterbytesvn.com/');
})

test('Test-02: Open 2 tabs in different browser contexts', async ({browser}) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto('https://material.playwrightvn.com/');
    await page2.goto('https://e-commerce-dev.betterbytesvn.com/');
})