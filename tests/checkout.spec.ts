import {test,expect} from '@playwright/test';
import { users } from '../testdata/users';
import { products } from '../testdata/products';
 
const standard_user = users[0];
const product1 = products[0];
const product2 = products[1];

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill('[data-test="username"]', standard_user.username);
  await page.fill('[data-test="password"]', standard_user.password);
  await page.click('[data-test="login-button"]');
  await page.locator(products[0].addToCartLocator).click();
  await page.locator(products[1].addToCartLocator).click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);
});

test("TC_010 Checkout with valid details ",async({page})=>{
        await page.fill('[data-test="firstName"]','Jane');
        await page.fill('[data-test="lastName"]','Doe');
        await page.fill('[data-test="postalCode"]', '100290');
        await page.click ('[data-test="continue"]');
        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('.title')).toHaveText('Checkout: Overview')
});

test("TC_011 Checkout with missing first name ",async({page})=>{
        await page.fill('[data-test="lastName"]','Doe');
        await page.fill('[data-test="postalCode"]', '100290');
        await page.click ('[data-test="continue"]');
        await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");
});

test("TC_012 Checkout with missing postal code ",async({page})=>{
        await page.fill('[data-test="firstName"]','Jane');
        await page.fill('[data-test="lastName"]','Doe');
        await page.click ('[data-test="continue"]');
        await expect(page.locator('[data-test="error"]')).toContainText("Error: Postal Code is required");
});

test("TC_013 Checkout with missing last name ",async({page})=>{
        await page.fill('[data-test="firstName"]','Jane');
        await page.fill('[data-test="postalCode"]', '100290');
        await page.click ('[data-test="continue"]');
        await expect(page.locator('[data-test="error"]')).toContainText("Error: Last Name is required");
});