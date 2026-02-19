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

	await login.enterEnvUserCredentials();

	await expect(greetingText).toBeVisible();

	await login.logoutUser();

	await expect(greetingText).not.toBeVisible();
});
