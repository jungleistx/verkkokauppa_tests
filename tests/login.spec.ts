import { test, expect } from '@playwright/test';
import { acceptCookiesIfVisible } from './utils/cookies';
import { LoginComponent } from './pages/login.component';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await acceptCookiesIfVisible(page);
});


test('login with env, logoout', async ({ page }) => {
	const login = new LoginComponent(page);
	const greetingText = page.getByText(new RegExp(`Hei, ${process.env.USER_FIRSTNAME}`));

	await login.loginWithEnvCredentials();

	await expect(greetingText).toBeVisible();

	await login.logoutUser();

	await expect(greetingText).not.toBeVisible();
});


test('login with invalid credentials', async ({ page }) => {
	const login = new LoginComponent(page);
	const username = 'user@gmail.com';
	const password = 'invalIDpassword_4#';
	const greetingText = page.getByText(new RegExp(`Hei, ${process.env.USER_FIRSTNAME}`));
	const loginMenuButton = page.getByRole('button', { name: 'Kirjaudu sisään' });

	await login.loginWithInvalidCredentials(username, password);
	await expect(greetingText).not.toBeVisible();

	await login.closeLoginMenu();

	await page.reload();

	await expect(loginMenuButton).toBeVisible();
	await expect(greetingText).not.toBeVisible();
});


test('login link should not lead to notfound page', async ({ page }) => {
	const login = new LoginComponent(page);
	const loginLink = page.getByRole('link', { name: 'Kirjaudu sisään' });

	await login.openLoginMenu();

	await loginLink.waitFor({ state: 'visible', timeout: 5000 });
	await loginLink.click();

  await expect(page.locator('h1')).not.toContainText('Sivua ei löytynyt');
  await expect(page.getByText('Sivua ei löytynyt', { exact: true })).not.toBeVisible();
});
