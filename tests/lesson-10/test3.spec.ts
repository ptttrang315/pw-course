import { expect, test } from '@playwright/test';
import { MaterialBasePage } from './pages/material-base-page';
import { TodoPage } from './pages/todo-page';

test('Add to-do item', async ({page}) => {    
    const materialBasePage = new MaterialBasePage(page);
    const todoPage = new TodoPage(page);

    await test.step('Go to Material page', async () => {
        await materialBasePage.openMaterialPage();
        await expect(materialBasePage.heading('Tài liệu học automation test', 1)).toBeVisible();
    });

    await test.step('Go to User Registration page', async () => {
        await materialBasePage.gotoPage('Todo page');
        await expect(todoPage.heading('To-Do List',1)).toBeVisible();
    });

    const todoList = await test.step('Add 100 to-do items', async () => {
        return await todoPage.addNumberOfItem(10);
    });

    await test.step('Remove to-do item with odd number', async () => {
        await todoPage.removeTodoOdd(todoList);

    });

    await test.step('Check only item with even number in viewport', async() => {
        const items = await todoPage.checkEvenItemViewport();
        expect(todoPage.isTodoEven(items)).toBe(true);

        expect(items).toContain('Todo 10');
    })

    await test.step(`Check todo with number is hidden`, async() => {
        expect(todoPage.xpathItemHidden('Todo 3')).toBeHidden();
    })

});