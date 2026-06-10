import {test, expect} from '@playwright/test';

test('Registration', async ({page}) => {
    await page.goto("https://material.playwrightvn.com/");

    await page.locator("//a[contains(text(), 'Bài học 1: Register Page')]").click();

    await page.locator("//input[@id = 'username']").fill("TrangPham");

    await page.locator("//input[@id = 'email']").pressSequentially("trangptt@mail.com");

    await page.locator("//input[@id = 'female']").check();

    await page.locator("//input[@id = 'traveling']").check();

    await page.locator("//input[@id = 'reading']").check();

    await page.locator("//select[@id = 'interests']").selectOption("Sports");

    await page.locator("//select[@id = 'country']").selectOption("Australia");

    await page.locator("//input[@id = 'dob']").pressSequentially("31051998");

    await page.locator("//input[@id = 'profile']").setInputFiles("tests/lesson-05/01-dom.txt");

    await page.locator("//textarea[@id = 'bio']").fill("Albert Einstein was a world-renowned theoretical physicist, born in Germany in 1879. He is best known for developing the theory of relativity, which fundamentally changed our understanding of time and space.")
    
    await page.locator("//input[@id = 'rating']").fill("9");
    
    await page.locator("//input[@id = 'favcolor']").fill("#004cff");
    
    await page.locator("//div[@class = 'tooltip']").hover();

    await expect(page.locator("//span[@class = 'tooltiptext'][contains(text(), 'Subscribe to our newsletter for updates')]")).toBeVisible();
    
    await page.locator("//input[@id = 'newsletter']").setChecked(true);

    await page.locator('input#toggleOption').click({ 
        force: true, 
        position: { x: 0, y: 0 } 
    });

    const box = await page.locator("//div[@id='starRating']").boundingBox();

    if(!box){
        throw new Error('Star is not visible'); 
    }

    await page.mouse.click(
        box.x + box.width * 0.92,
        box.y + box.height / 2
    );

    await page.locator("//input[@id = 'customDate']").isDisabled();
   
    await page.locator("//button[@type = 'submit']").click();

});