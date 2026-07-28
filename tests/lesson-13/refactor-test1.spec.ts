import { test, expect } from './fixtures'
import { RegisterPage } from './pages/register-page';
import { registerUserData } from './test-data/user-data';

test('Registration', async ({materialPage, page}) => {
    const registerPage = new RegisterPage(page);

    await test.step('Go to User Registration page', async () => {
        await materialPage.gotoPage('Register Page');
        await expect(registerPage.heading('User Registration',1)).toBeVisible();
    });

    await test.step('Register a new user', async () => {
        await registerPage.fillUserName(registerUserData.userName);
        await registerPage.fillEmail(registerUserData.email);
        await registerPage.checkGender(registerUserData.gender);
        await registerPage.checkHobbies(registerUserData.hobbies);
        await registerPage.selectInterest(registerUserData.interests);
        await registerPage.selectCountry(registerUserData.country);
        await registerPage.inputDoB(registerUserData.dateOfBirth);
        await registerPage.chooseFile(registerUserData.filePath)
        await registerPage.inputBio(registerUserData.biography);
        await registerPage.rating(registerUserData.rating);
        await registerPage.selectFavColor(registerUserData.favoriteColor);
        await expect(registerPage.hoverTxt()).toHaveText('Subscribe to our newsletter for updates');
        await registerPage.checkNewsletter(registerUserData.newsletter);
        await registerPage.enableFeature(registerUserData.enableFeature);
        await registerPage.starRating(registerUserData.starRating);
        await registerPage.clickRegister();
    });

    await test.step('Verify new added user', async() => {
        const userInfo = await registerPage.getContent();
        console.log(userInfo);

        const expectedData = {
            gender: registerUserData.gender,
            hobbies: registerUserData.hobbies
                .map(h => h.toLowerCase())
                .join(', '),
            country: registerUserData.country.toLowerCase(),
            dateOfBirth: `${registerUserData.dateOfBirth.slice(4,8)}-${registerUserData.dateOfBirth.slice(2,4)}-${registerUserData.dateOfBirth.slice(0,2)}`,
            biography: registerUserData.biography,
            rating: registerUserData.rating,
            favoriteColor: registerUserData.favoriteColor,
            newsletter: registerUserData.newsletter ? 'Yes' : 'No',
            enableFeature: registerUserData.enableFeature ? 'Yes' : 'No',
            starRating: `${registerUserData.starRating}⭐`
        };
        console.log(expectedData);

        expect(userInfo).toMatchObject(expectedData);

    })
});