import { Page, Locator } from '@playwright/test'
import { MaterialPage } from './material-page';

export class TodoPage extends MaterialPage {
    xpathInputField: string = '//input[@id="new-task"]';
    xpathAddBtn: string = '//button[@id="add-task"]';
    xpathListViewport: string = '//ul[@id="task-list"]/li/span';
    
    xpathItemHidden (todoItem: string) {
        return this.page.locator(`//*[@id="task-list"]//*[contains(text(), "${todoItem}")]`)
    }
    
    private xpathDeleteBtn (id: number) {
        return this.page.locator(`//button[@id="todo-${id}-delete"]`);
    }

    constructor(page: Page){
        super(page);
    }

    addAnItem = async (todoText: string) => {
        await this.page.locator(this.xpathInputField).fill(todoText);
        await this.page.locator(this.xpathAddBtn).click();
        return todoText;
    }

    addNumberOfItem = async (number: number) => {
        let listToDo: string[] = [];
        for(let i = 1; i <= number; i++){
            let item = await this.addAnItem(`Todo ${i}`);
            listToDo.push(item);
        }
        return listToDo;
    }

    removeTodoOdd = async (listToDo: string[]) => {
        let todoOdd = this.returnTodoOddNumber(listToDo);
        for(let item of todoOdd){
            await this.deleteAnItem(item);
        }
    }

    // Filter to-do item with odd numbers
    returnTodoOddNumber = (listToDo: string[]) => {
        let oddList = listToDo.filter(item => {
            let number = Number(item.split(' ')[1]);
            return number % 2 != 0;
        });
        return oddList;
    }

    // Delete item with condition
    deleteAnItem = async (todoItem: string) => {
        let number = Number(todoItem.split(' ')[1]);

        this.page.once('dialog', dialog => dialog.accept());
        await this.xpathDeleteBtn(number).click();
    }

    // Verify to do item that have even number
    isTodoEven = (listTodo: string[]) => {
        return listTodo.every(item => {
            const part = item.split(' ');
            const number = Number(part[1]);
            return part[0] === 'Todo' && number % 2 === 0;
        })
    }

    checkEvenItemViewport = async () => {
        return await this.page.locator(this.xpathListViewport).allTextContents();
    }

}