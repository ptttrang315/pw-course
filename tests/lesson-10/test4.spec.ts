import { test, expect } from '@playwright/test';
import { MaterialBasePage } from './pages/material-base-page';
import { PersonalNotesPage } from './pages/personal-notes-page';
import { actions } from './test-data/personal-notes-data';


test('Add notes', async ({page}) => {
    const materialBasePage = new MaterialBasePage(page);
    const personalNotesPage = new PersonalNotesPage(page);

    await test.step('Go to Material page', async () => {
        await materialBasePage.openMaterialPage();
        await expect(materialBasePage.heading('Tài liệu học automation test', 1)).toBeVisible();
    });

    await test.step('Go to User Registration page', async () => {
        await materialBasePage.gotoPage('Personal notes');
        await expect(personalNotesPage.heading('Personal Notes',1)).toBeVisible();
    });

    await test.step('Create 10 notes', async () => {
        await personalNotesPage.createNotes(actions)
        let list = await personalNotesPage.verifyNoteList();

        // Verify the list on UI have all added notes
        expect(list).toEqual(actions);
    });

    let list = await test.step('Search notes', async () => {
        await personalNotesPage.searchNotes('fill');
        return await personalNotesPage.verifyNoteList();
    });

    await test.step('Verify the list after searching', async () => {
        const expected = personalNotesPage.verifyListAfterSearch(actions, 'fill');
        expect(list).toEqual(expected)
    });
}
)