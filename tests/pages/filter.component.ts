import { Page, expect } from '@playwright/test';


export class FilterComponent {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	private async waitForResultsToLoad() {
		await this.page.getByText('Ladataan hakutuloksia').waitFor({ state: 'hidden' });
		await this.page.getByRole('heading', { name: /(tulos|tulosta) haulla/i }).waitFor({ state: 'visible' });
	}

	// filter buttons
	private get openFilterMenuButton() {
		return this.page.getByRole('button', { name: 'Kaikki suodattimet' });
	}
	private get clearAllFiltersButton() {
		return this.page.getByRole('button', { name: 'Tyhjennä kaikki' });
	}
	private get closeFilterMenuButton() {
		return this.page.getByRole('button', { name: 'Sulje' });
	}
	private get openPriceFilterButton() {
		return this.page.getByLabel('Suodattimet').getByRole('button', { name: 'Hinta' });
	}
	private get applyFiltersButton() {
		return this.page.getByRole('button', { name: 'Suodata' });
	}
	private get openAvailabilityMenuButton() {
		return this.page.getByLabel('Suodattimet').getByRole('button', { name: 'Saatavuus' });
	}


	// actions
	async openFilterMenu() {
		await this.openFilterMenuButton.click();
	}

	async closeFilterMenu() {
		await this.closeFilterMenuButton.click();
	}

	async applyFilters() {
		await this.applyFiltersButton.click();
		await this.waitForResultsToLoad();
	}

	async setFilterPriceRange(min: string, max: string) {
		const minPriceBox = this.page.getByRole('textbox', { name: 'minimi' });
		const maxPriceBox = this.page.getByRole('textbox', { name: 'maksimi' });

		await this.openPriceFilterButton.click();

		await minPriceBox.waitFor({ state: 'visible' });
		await maxPriceBox.waitFor({ state: 'visible' });

		await minPriceBox.click();
		await minPriceBox.fill(min);
		// include the min price in url
		await this.page.waitForURL(new RegExp(min), { timeout: 5000 });
		await this.waitForResultsToLoad();

		await maxPriceBox.click();
		await maxPriceBox.fill(max);
		// include the max price in url
		await this.page.waitForURL(new RegExp(max), { timeout: 5000 });
		await this.waitForResultsToLoad();
	}

	async setInstantAvailabilityFilter() {
		const availableCheckbox = this.page.getByLabel('Saatavuus').getByText('Heti lähetettävissä');

		await this.openAvailabilityMenuButton.click();

		await availableCheckbox.waitFor({ state: 'visible' });
		await availableCheckbox.click();

		await this.page.waitForURL(/AvailableImmediately/i);
		await this.waitForResultsToLoad();
	}
}
