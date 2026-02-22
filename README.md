# Test automations for verkkokauppa.com  :computer:


## Table of contents
1. [About The Project](#about-the-project)
   * [Technologies used](#technologies-used)
2. [Installation](#installation)
3. [Run](#run)
4. [Project Structure](#project-structure)
5. [Test Scenarios](#test-scenarios)
6. [Contact](#contact)

## About the project
Test automation cases for verkkokauppa.com, made with Playwright framework.
Created as assignment for a QA engineer trainee position.


### Technologies used
- **[Playwright](https://playwright.dev/)**
- **[Typescript](https://www.typescriptlang.org/)**

***

## Installation
### Requirements
- **[Node](https://nodejs.org/en)**
- **[Npm](https://www.npmjs.com/)**
- **[Git](https://git-scm.com/)**
- Valid verkkokauppa.com account (required for login tests)

### 1. Clone the repository
> ```bash
> git clone https://github.com/jungleistx/verkkokauppa_tests.git
>   ```
> ```bash
> cd verkkokauppa_tests
>   ```

### 2. Install dependencies and playwright browsers
> ```bash
> npm install
> ```
> ```bash
> npx playwright install

### 3. Setup env variables
> ```bash
> mv .env_example .env
>
> - Fill '.env' with your credentials


***


## Run
### 1. Run all tests
> ```bash
> npx playwright test

### 2. Run specific test file
> ```bash
> npx playwright test tests/<filename>

***

## Project structure
> ```
> |--.env 				# credentials for login
> |--tests/
> |   |--cart.spec.ts 		# tests for cart actions
> |   |--filter.spec.ts 		# tests for filtering results
> |   |--login.spec.ts 		# tests for login/logout
> |   |--search.spec.ts 		# tests for searching items
> |   |--pages/
> |       |--cart.page.ts 		# cart interactions
> |       |--filter.component.ts 	# filter menu interactions
> |       |--login.component.ts 	# login interactions
> |       |--result.page.ts 		# result list interactions and sorting
> |       |--seach.component.ts 	# search bar interactions
> |   |--utils/
> |       |--cookies.ts 		# cookie consent handler

***

## Test scenarios
- Search and filter

Search products, apply price filters, sort results, open products. This validates that search, filtering and sorting work together correctly and that the result list reflects applied filters before interactions. Crucial features for any webstore.

---

- Cart

Add items, remove items, verify cart state. Ensures the add-to-cart flow works end to end.
Business-critical feature.

---

- Authentication

Login, logout, login with invalid credentials. Ensures the login flow works correctly for valid users. Common and often used feature, required for checkout.

---

- Test notes

These tests run against the live production site. As a result, tests stability can be affected by site availability, Cloudflare rate limiting, and real-time inventory or content changes. A staging environment would be recommended for a more stable test results.

---

- Found defects

   - While logging in, in the loginmenu the top 'Kirjaudu sisään' link leads to notfound page.

***

## Contact
Roope Vuorenlehto

[Github @jungleistx](https://github.com/jungleistx) -
[LinkedIn](https://www.linkedin.com/in/roope-vuorenlehto/) -
[Project Link](https://github.com/jungleistx/verkkokauppa_tests)

<!-- link not working for reasons currently unknown to me-->
<!-- :arrow_up: [Back to top](#test-automations-for-verkkokauppa.com-computer) -->