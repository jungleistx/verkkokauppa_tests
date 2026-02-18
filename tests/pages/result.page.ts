import { expect, Page } from '@playwright/test';


export class ResultPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	private get sortDropdown() {
		return this.page.getByLabel('Tuotteiden järjestys');
	}

	async selectResultByIndex(n: number) {
		await this.page.locator('#main ol > li').nth(n).click();
		await expect(this.page).toHaveURL(/product/);
	}

	async sortResultsPriceAsc() {
		await this.sortDropdown.selectOption('price:asc');
		await this.page.waitForLoadState();
		await expect(this.page).toHaveURL(/price.*asc/);
	}

	async sortResultsPriceDesc() {
		await this.sortDropdown.selectOption('price:desc');
		await this.page.waitForLoadState();
		await expect(this.page).toHaveURL(/price.*desc/);
	}

	async sortResultsByDate() {
		await this.sortDropdown.selectOption('releaseDate:desc');
		await this.page.waitForLoadState();
		await expect(this.page).toHaveURL(/releaseDate.*desc/);
	}

	async sortResultsMostSold() {
		await this.sortDropdown.selectOption('popularity:desc');
		await this.page.waitForLoadState();
		await expect(this.page).toHaveURL(/popularity.*desc/);
	}

	async sortResultsByRating() {
		await this.sortDropdown.selectOption('rating:desc');
		await this.page.waitForLoadState();
		await expect(this.page).toHaveURL(/rating.*desc/);
	}

	async sortResultsByScore() {
		await this.sortDropdown.selectOption('score:desc');
		await this.page.waitForLoadState();
		await expect(this.page).toHaveURL(/score.*desc/);
	}
};
