import { expect, Page } from '@playwright/test';


export class CartPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	private get cartButton() {
		return this.page.getByRole('button', { name: 'Tarkastele ostoskoria' });
	}

	private get emptyCartText() {
		return this.page.getByText('Ostoskori on tyhjä');
	}

	private get itemInCartText() {
		return this.page.getByText(/(tuote|tuotetta), yhteensä/).first();
	}

	private get addToCartButton() {
		return this.page.locator('button').filter({ hasText: 'Lisää ostoskoriin' });
	}

	async goto() {
		await this.cartButton.click();
		await this.page.waitForURL(/cart/);
	}

	async assertCartIsEmpty() {
		await expect(this.emptyCartText).toBeVisible();
		await expect(this.page).toHaveURL(/cart$/);
		await expect(this.itemInCartText).not.toBeVisible();
	}

	async assertCartNotEmpty() {
		await expect(this.emptyCartText).not.toBeVisible();
		await expect(this.itemInCartText).toBeVisible();
		await expect(this.page).toHaveURL(/cart\/.+$/);
	}

	async addItemToCartFromProductPage() {
		await this.page.waitForURL(/product/);
		await expect(this.addToCartButton).toBeVisible();
		await this.addToCartButton.click();
	}
};
