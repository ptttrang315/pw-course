import { Page, Locator} from "@playwright/test";
import { MaterialPage } from './material-page';

export class RegisterPage extends MaterialPage {
    xpathUsername: string = '//input[@id="username"]';
    xpathEmail: string = '//input[@id="email"]';
    xpathGenderMale: string = '//input[@id="male"]';
    xpathGenderFemale: string = '//input[@id="female"]';
    xpathBioField: string = '//textarea[@id = "bio"]';
    xpathFavColor: string ='//input[@id = "favcolor"]';
    xpathHoverTxt: string = '//span[@class = "tooltiptext"]';
    xpathStarRating: string = '//div[@id="starRating"]';
    xpathRegisterBtn: string = '//button[@type = "submit"]';

    private selectByLabel(name: string) {
        return this.page.getByLabel(name);
    }

    private inputByLabel(name: string) {
        return this.page.getByLabel(name);
    }

    hoverTxt() : Locator {
        return this.page.locator(this.xpathHoverTxt);
    }

    constructor(page: Page) {
        super(page);
    }

    async fillUserName(name:string) {
        await this.page.locator(this.xpathUsername).fill(name);

    };

    async fillEmail(email: string) {
        await this.page.locator(this.xpathEmail).fill(email);

    };

    async checkGender(gender: string) {
        if (gender === 'female') {
            await this.page.locator(this.xpathGenderFemale).check();
            return;
        }
        await this.page.locator(this.xpathGenderMale).check();
    };

    async checkHobbies(hobby: string[]) {
        for(let item of hobby) {
            await this.inputByLabel(item).check();
        }
    }

    async selectInterest(selectInterest: string) {
        await this.selectByLabel('Interests').selectOption(selectInterest);
    }

    async selectCountry(selectCountry: string) {
        await this.selectByLabel('Country').selectOption(selectCountry);
    }

    async inputDoB(date: string) {
        await this.inputByLabel('Date of Birth').pressSequentially(date);
    }

    async chooseFile(fileDirectory: string) {
        await this.inputByLabel('Profile Picture').setInputFiles(fileDirectory);
    }

    async inputBio(text: string) {
        await this.page.locator(this.xpathBioField).fill(text);
    }

    async rating(rateNumber: string) {
        await this.inputByLabel('Rate Us').fill(rateNumber);
    }

    async selectFavColor(color: string) {
        await this.page.locator(this.xpathFavColor).fill(color);
    }

    async checkNewsletter(isChecked: boolean) {
        await this.inputByLabel('Subscribe')
            .setChecked(isChecked);
    }
    async enableFeature(isChecked: boolean) {
        const checkbox = this.inputByLabel('Enable Feature');

        if ((await checkbox.isChecked()) !== isChecked) {
            await checkbox.click({
                force: true,
                position: { x: 0, y: 0 }
            });
        }
    }

    async starRating(star: number) {
        const box = await this.page.locator(this.xpathStarRating).boundingBox();
        if(!box){
            throw new Error('Star is not visible'); 
        }
        
        let percentage = star / 10 * 2;
        await this.page.mouse.click(
            box.x + box.width * percentage ,
            box.y + box.height / 2
        );
    }

    async clickRegister() {
        await this.page.locator(this.xpathRegisterBtn).click();
    }
    
    async getContent() {
        const contents = await this.page.locator('//table[@id="userTable"]//tbody//td[4]').allTextContents();
        if (contents.length === 0) {
            return {};
        }
        const createdUserInfo = contents[0];
        const formatData =  Object.fromEntries(
            createdUserInfo
            .trim()
            .split('\n')
            .map(line => {
                const [key, value] = line.split(':');

                const camelKey = key
                .trim()
                .toLowerCase()
                .replace(/\s+(\w)/g, (_, char) => char.toUpperCase());

                return [camelKey, value ? value.trim() : ''];
            })
        );
        return formatData;
    };
}