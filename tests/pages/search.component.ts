import { expect, Page } from '@playwright/test';


export class SearchComponent {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	};

	async searchForItem(searchTerm: string) {
		const searchBox = this.page.getByRole('combobox', { name: 'Hae kaupasta' });

		await searchBox.click();
		await searchBox.fill(searchTerm);
		await searchBox.press('Enter');

		await expect(this.page).toHaveURL(/search/);
		await expect(this.page).toHaveTitle(/haun tulokset/i);
	};
};
