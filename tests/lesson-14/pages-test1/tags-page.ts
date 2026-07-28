import { DashboardPage } from "./dashboard-page";
import { Page, Locator } from '@playwright/test'

export class TagsPage {
    page: Page
    readonly tagsTab: Locator;
    readonly tagsHeading: Locator;
    readonly tagsList: Locator;
    readonly postNav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tagsTab = page.locator('a[href="edit-tags.php?taxonomy=post_tag"]');
        this.tagsHeading = page.getByRole('heading', {name: 'Tags', exact: true });
        this.tagsList = page.locator('table.wp-list-table.widefat.fixed.striped.table-view-list.tags');
        this.postNav = page.locator('//*[@id="menu-posts"]');
    }

    goToTagsPage = async () => {
        await this.postNav.click();
        await this.tagsTab.click();
    }

}