import { Page } from '@playwright/test';


export async function acceptCookiesIfVisible(page: Page) {
	const cookieButton = page.getByRole('button', { name: 'Vain välttämättömät' });

	try {
		await cookieButton.waitFor({ state: 'visible', timeout: 5000 });
		await cookieButton.click();
	} catch {
		// no popup, continue
	}
};
