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

	async goto() {
		await this.cartButton.click();
		await this.page.waitForURL(/cart/);
	}

	async assertCartIsEmpty() {
		await expect(this.emptyCartText).toBeVisible();
		await expect(this.page).toHaveURL(/cart$/);
	}
};
