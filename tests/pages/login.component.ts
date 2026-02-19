import { expect, Page } from '@playwright/test';


export class LoginComponent {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	private get loginMenuButton() {
		return this.page.getByRole('button', { name: 'Kirjaudu sisään' });
	}

	private get loginButton() {
		return this.page.locator('#login-form').getByRole('button', { name: 'Kirjaudu sisään' });
	}

	private get emailTextfield() {
		return this.page.getByRole('textbox', { name: 'Sähköpostiosoite' });
	}

	private get passwordTextfield() {
		return this.page.getByRole('textbox', { name: 'Salasana' });
	}

	private get greetingText() {
		return this.page.getByText(new RegExp(`Hei, ${process.env.USER_FIRSTNAME}`));
	}

	private get accountButton() {
		return this.page.getByRole('button', { name: 'Siirry tilinhallintaan' });
	}

	private get logoutButton() {
		return this.page.getByRole('button', { name: 'Kirjaudu ulos' });
	}

	private get closeLoginMenuButton() {
		return this.page.getByRole('button', { name: 'Sulje valikko' });
	}

	async openLoginMenu() {
		await this.loginMenuButton.click();
	}

	async enterEnvUserCredentials() {
		await this.openLoginMenu();

		await this.emailTextfield.waitFor({ state: 'visible' });
		await this.passwordTextfield.waitFor({ state: 'visible' });

		await this.emailTextfield.fill(process.env.USER_EMAIL);
		await this.passwordTextfield.fill(process.env.USER_PASSWORD);

		await this.loginButton.click();

		await this.greetingText.waitFor({ state: 'visible' , timeout: 5000 });
		await this.page.reload();
		await this.greetingText.waitFor({ state: 'visible', timeout: 5000 });
	}

	async logoutUser() {
		await this.greetingText.waitFor({ state: 'visible' });

		await this.accountButton.waitFor({ state: 'visible' });
		await this.accountButton.click();

		await this.logoutButton.waitFor({ state: 'visible' });
		await this.logoutButton.click();

		await this.closeLoginMenuButton.waitFor({ state: 'visible' });
		await this.closeLoginMenuButton.click();

		await this.greetingText.waitFor({ state: 'hidden' });

		await this.page.reload();

		await this.greetingText.waitFor({ state: 'hidden' });

		await this.loginMenuButton.waitFor({ state: 'visible' });
	}
}
