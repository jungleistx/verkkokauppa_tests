import { Page } from '@playwright/test';


export async function acceptCookiesIfVisible(page: Page) {
	const cookieButton = page.getByRole('button', { name: 'Vain välttämättömät' });

	if (await cookieButton.isVisible()) {
		await cookieButton.click();
	}
};
