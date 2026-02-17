import { Page } from '@playwright/test';


export class ResultPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async selectResultByIndex(n: number) {
		await this.page.locator('#main ol > li').nth(n).click();
	}

	async sortResultsPriceAsc() {
		  await this.page.getByLabel('Tuotteiden järjestys').selectOption('price:asc');
	}

	async sortResultsPriceDesc() {
		await this.page.getByLabel('Tuotteiden järjestys').selectOption('price:desc');
	}

	async sortResultsByDate() {
		await this.page.getByLabel('Tuotteiden järjestys').selectOption('releaseDate:desc');
	}

	async sortResultsMostSold() {
		await this.page.getByLabel('Tuotteiden järjestys').selectOption('popularity:desc');
	}

	async sortResultsByRating() {
		await this.page.getByLabel('Tuotteiden järjestys').selectOption('rating:desc');
	}

	async sortResultsByScore() {
		  await this.page.getByLabel('Tuotteiden järjestys').selectOption('score:desc');
	}
};
