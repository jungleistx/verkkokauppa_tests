import { test, expect } from '@playwright/test';
import { SearchComponent } from './pages/search.component';
import { acceptCookiesIfVisible } from './utils/cookies';
import { ResultPage } from './pages/result.page';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await acceptCookiesIfVisible(page);
});


test('search for nikon, sort by price and select 2nd', async ({ page }) => {
  const search = new SearchComponent(page);
  const results = new ResultPage(page);

  await search.searchForItem('Nikon');
  await results.sortResultsPriceDesc();
  await results.selectResultByIndex(1);

  await expect(page).toHaveTitle(/nikon/i);
  // // task 1 version, add soft assertion
  // await expect(page).toHaveTitle(/Nikon Z30/);
});


test('search for tv, sort most sold, select 1st', async ({ page }) => {
  const search = new SearchComponent(page);
  const results = new ResultPage(page);

  await search.searchForItem('tv');
  await results.sortResultsMostSold();
  await results.selectResultByIndex(0);

  await expect(page).toHaveTitle(/kolmen vuoden takuu/i);
});
