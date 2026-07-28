import { test } from '@playwright/test'
import { MaterialPage } from './pages-test2/material-page';
import { DragDropPage } from './pages-test2/drag-drop-page';

test('Drag and drop', async({page}) => {
    const materialPage = new MaterialPage(page);
    const dragDropPage = new DragDropPage(page);

    await materialPage.goToPage('Bài học 5: Puzzle drag and drop game');

    const length = await dragDropPage.numberOfPieces();
    
    for(let i = 1; i <= length; i++){
        await dragDropPage.dragDrop(i,i);
    }
})