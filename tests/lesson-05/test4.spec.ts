import {test, expect} from '@playwright/test';

test('Add notes', async ({page}) => {
const actions: Actions[] = [
    {
        action: 'click',
        description: 'Hàm click dùng để thực hiện click vào các phần tử trên trang web'
    },
    {
        action: 'fill',
        description: 'Hàm fill dùng để điền văn bản vào các trường input hoặc textarea trên trang web'
    },
    {
        action: 'type',
        description: 'Hàm type dùng để nhập từng ký tự một vào phần tử, mô phỏng hành vi gõ phím thực tế của người dùng'
    },
    {
        action: 'hover',
        description: 'Hàm hover dùng để di chuyển con trỏ chuột đến vị trí của phần tử, kích hoạt các hiệu ứng hover'
    },
    {
        action: 'check',
        description: 'Hàm check dùng để đánh dấu checkbox hoặc radio button, đảm bảo phần tử ở trạng thái checked'
    },
    {
        action: 'uncheck',
        description: 'Hàm uncheck dùng để bỏ đánh dấu checkbox, đảm bảo phần tử ở trạng thái unchecked'
    },
    {
        action: 'selectOption',
        description: 'Hàm selectOption dùng để chọn một hoặc nhiều option trong thẻ select dropdown'
    },
    {
        action: 'press',
        description: 'Hàm press dùng để mô phỏng việc nhấn phím bàn phím như Enter, Tab, Escape hoặc các phím khác'
    },
    {
        action: 'dblclick',
        description: 'Hàm dblclick dùng để thực hiện double click (nhấp đúp chuột) vào phần tử trên trang web'
    },
    {
        action: 'dragAndDrop',
        description: 'Hàm dragAndDrop dùng để kéo một phần tử từ vị trí nguồn và thả vào vị trí đích trên trang web'
    }
];
    //Declare actions
    type Actions ={
        action: string;
        description: string
    }
    // Create notes
    const createNotes = async (actions: Actions[]) => {
        for(let item of actions ) {
            await page.locator('//input[@id="note-title"]').fill(item.action);
            await page.locator('//textarea[@id="note-content"]').fill(item.description);

            await page.locator('//button[@id="add-note"]').click();
        }
    }
    // Search notes
    const searchNotes = async (text: string) => {
        await page.locator('//input[@id="search"]').fill(text);
    }

    // Go to page
    await page.goto('https://material.playwrightvn.com/');
   
    // Go to `Bai hoc 4:Personal notes `
    await page.locator('//a[text() = "Bài học 4: Personal notes"]').click();
   
    // Create notes
    await createNotes(actions);

    //get all created notes
    let allTextContents = await page.locator('//ul[@id="notes-list"]/li/div').allTextContents();
    console.log(allTextContents);

    // Search notes
    let searchText = 'Hàm';
    await searchNotes(searchText);

    // Get all the notes of table after search
    let searchContext = await page.locator('//ul[@id="notes-list"]/li/div').allTextContents();
    console.log(searchContext);

    let todoListSearch = searchContext.filter(ele => ele.includes(searchText));
    console.log(todoListSearch);
}
)