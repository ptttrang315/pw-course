import { Page, Locator } from '@playwright/test'

export class DragDropPage {
    page: Page;

    pieceFromLoc = (pos: number) => {
        return this.page.locator(`#piece-${pos}`);
    }

    pieceToLocator = (pos: number) => {
        return this.page.locator(`[data-piece="${pos}"]`)
    }

    numberOfPieces = () => {
        return this.page.locator('div.puzzle-piece').count();
    }

    constructor(page: Page) {
        this.page = page;
    }

    dragDrop = async (pieceFrom: number, pos: number) => {
        await this.pieceFromLoc(pieceFrom).dragTo(this.pieceToLocator(pos))
    }

}