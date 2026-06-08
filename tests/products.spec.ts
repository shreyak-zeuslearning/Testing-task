import { test, expect } from "@playwright/test";
import { users } from "../testdata/users";
import { products } from "../testdata/products";

const standard_user = users[0];
const product1 = products[0];
const product2 = products[1];

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill('[data-test="username"]', standard_user.username);
  await page.fill('[data-test="password"]', standard_user.password);
  await page.click('[data-test="login-button"]');
});

test("TC_005 Product list should be visible after login", async ({ page }) => {
  await expect(page.locator(".inventory_item")).toHaveCount(6);
});

test("TC_006 Add one product to the cart", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
});

test("TC_007 Remove product from the cart", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});

test("TC_008 Add multiple products to cart ", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");
});

test("TC_009 Cart page should show selected products  ", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  await expect(page.getByText(product1.name)).toBeVisible();
  await expect(page.getByText(product2.name)).toBeVisible();
});
