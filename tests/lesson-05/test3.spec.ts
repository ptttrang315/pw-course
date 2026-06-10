import {expect, test} from '@playwright/test'

test('Add to-do item', async ({page}) => {    
    // Create function for 100 to-do items
    const createItem = async (todoText: string) => {
        await page.locator('//input[@id="new-task"]').fill(todoText);
        await page.locator('//button[@id="add-task"]').click();
    }

    // Verify created to-do item
    const verifyExistingItem = async (todoText: string) => {
        await expect(page.locator('//ul[@id="task-list"]//li').last()).toContainText(todoText);
    }

    const addAnItem = async (todoText: string) => {
        await createItem(todoText);
        await verifyExistingItem(todoText);
        return todoText;
    }

    const addToDoList = (todoText: string, list: string[]) => {
        list.push(todoText);
    }

    // Filter to-do item with odd numbers
    const returnTodoOddNumber = () => {
        let oddList = listToDo.filter(item => {
            let number = Number(item.split(' ')[1]);
            return number % 2 != 0;
        });
        return oddList;
    }

    // Delete item with condition
    const deleteAnItem = async (todoItem: string) => {
        let number = Number(todoItem.split(' ')[1]);

        page.once('dialog', dialog => dialog.accept());
        await page.locator(`//button[@id="todo-${number}-delete"]`).click();
    }

    // Go to page
    await page.goto('https://material.playwrightvn.com/');
    // Go to Bai hoc 3
    await page.locator('//a[text() = "Bài học 3: Todo page"]').click();

    let listToDo: string[] = [];
    // Create 100 to-do items
    for(let i = 1; i <= 100; i++){
        let item = await addAnItem(`Todo ${i}`);
        addToDoList(item, listToDo);
    }
    console.log(listToDo);    

    // Delete to-do items that have the odd number
    let todoOddNumber = returnTodoOddNumber();
    for(let number of todoOddNumber){
        await deleteAnItem(number);
    }

});