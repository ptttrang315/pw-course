import { Page, Locator } from '@playwright/test';
import { MaterialPage } from './material-page';

type Actions = {
    action: string;
    description: string
}

export class PersonalNotesPage extends MaterialPage {
    xpathTitleInput: string = '//input[@id="note-title"]';
    xpathContentInput: string = '//textarea[@id="note-content"]';
    xpathAddNoteBtn: string = '//button[@id="add-note"]';
    xpathSearchField: string = '//input[@id="search"]';
    xpathNotesList: string = '//ul[@id="notes-list"]/li/div';

    constructor(page: Page) {
        super(page);
    }

    createNotes = async (actions: Actions[]) => {
    for(let item of actions ) {
        await this.page.locator(this.xpathTitleInput).fill(item.action);
        await this.page.locator(this.xpathContentInput).fill(item.description);
        await this.page.locator(this.xpathAddNoteBtn).click();
    }
    }
    // Search notes
    searchNotes = async (text: string) => {
        await this.page.locator(this.xpathSearchField).fill(text);
    }

    //get all created notes
    verifyNoteList = async () => {
        const allTextContents = await this.page.locator(this.xpathNotesList).allTextContents();
        const actual = allTextContents.filter(item => !item.includes('Edit')).map(item => {
            const [action, description] = item.trim().split('\n').map(line => line.trim());
            return {
                action,
                description
            };
        })
        return actual;
    }

    verifyListAfterSearch = (actions: Actions[], searchText: string) => {
        const keyword = searchText.toLowerCase();
        return actions.filter(ele => ele.action.includes(keyword) || ele.description.includes(keyword));
    }

}
