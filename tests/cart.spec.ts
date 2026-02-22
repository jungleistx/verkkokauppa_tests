import { test, expect } from '@playwright/test';
import { SearchComponent } from './pages/search.component';
import { acceptCookiesIfVisible } from './utils/cookies';
import { ResultPage } from './pages/result.page';
import { CartPage } from './pages/cart.page';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await acceptCookiesIfVisible(page);
});


test('verify empty cart, add item, verify full cart', async ({ page }) => {
  const search = new SearchComponent(page);
  const results = new ResultPage(page);
  const cart = new CartPage(page);

  await cart.goto();
  await cart.assertCartIsEmpty();

  await page.goto('/product/1013441/')
  await cart.addItemToCartFromProductPage();

  await cart.goto();
  await cart.assertCartNotEmpty();
  await cart.assertItemInCart('PlayStation');
});


test('add 2 items, remove, verify empty cart', async ({ page }) => {
	const cart = new CartPage(page);

	await cart.goto();
	await cart.assertCartIsEmpty();

	await page.goto('/product/343139/')
	await cart.addItemToCartFromProductPage();

	await page.goto('/product/419537/')
	await cart.addItemToCartFromProductPage();

	await cart.goto();
	await cart.assertItemInCart('PLX-500');
	await cart.assertItemInCart('DJM-750MK2');

	await cart.goto();
	await cart.removeAllItemsFromCart();
	await cart.assertCartIsEmpty();
});
