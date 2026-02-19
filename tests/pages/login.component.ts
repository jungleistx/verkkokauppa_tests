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
		return this.page.getByText(new RegExp(`hey, ${process.env.USER_FIRSTNAME}`));
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

		await this.greetingText.waitFor({ state: 'visible' });
		await this.page.reload();
		await this.greetingText.waitFor({ state: 'visible' });
	}
}
