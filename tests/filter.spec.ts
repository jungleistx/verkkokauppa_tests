import { test, expect } from '@playwright/test';
import { SearchComponent } from './pages/search.component';
import { acceptCookiesIfVisible } from './utils/cookies';
import { ResultPage } from './pages/result.page';
import { FilterComponent } from './pages/filter.component';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await acceptCookiesIfVisible(page);
});


test('search nikon, filter for price, select product', async ({ page }) => {
  const search = new SearchComponent(page);
  const results = new ResultPage(page);
  const filter = new FilterComponent(page);

  await search.searchForItem('nikon');
  await expect(page).toHaveURL(/search/);

  await filter.openFilterMenu();
  await filter.setFilterPriceRange('4490', '4600');
  await filter.applyFilters();

  await results.sortResultsPriceAsc();
  await results.sortResultsPriceDesc();

  await results.selectResultByIndex(0);

  await expect(page).toHaveURL(/product/);
  await expect(page).toHaveTitle(/Nikon Z8/i);
});


test('search tv, filter for availability and price, select 2nd', async ({ page }) => {
  const search = new SearchComponent(page);
  const results = new ResultPage(page);
  const filter = new FilterComponent(page);

  await search.searchForItem('tv');
  await expect(page).toHaveURL(/search/);

  await filter.openFilterMenu();
  await filter.setFilterPriceRange('600', '1200');
  await filter.setInstantAvailabilityFilter();
  await filter.applyFilters();

  await results.selectResultByIndex(1);

  await expect(page).toHaveURL(/product/);
  await expect(page).toHaveTitle(/TCL.*P8K/i);
});
