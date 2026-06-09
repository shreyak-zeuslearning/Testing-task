import { test, expect } from "@playwright/test";
import { users } from "../testdata/users";
import { products } from "../testdata/products";

import {LoginPage} from '../pages/LoginPage';
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

const standard_user = users[0];
const product1 = products[0];
const product2 = products[1];

let loginPage:LoginPage;
let productPage:ProductPage;
let cartPage:CartPage;


test.beforeEach(async ({ page }) => {
loginPage=new LoginPage(page);
productPage= new ProductPage(page);
cartPage= new CartPage(page);
await loginPage.goto();

await loginPage.login(
    standard_user.username,
    standard_user.password
)
});

test("TC_005 Product list should be visible after login @cart @regression", async ({ page }) => {
  await productPage.verifyProductsPageIsVisible();
  await expect(page.locator(".inventory_item")).toHaveCount(6);
});

test("TC_006 Add one product to the cart @cart", async ({ page }) => {
   await productPage.addProductToCart(product1.name);
  await productPage.verifyCartCount(1);
});

test("TC_007 Remove product from the cart @cart", async ({ page }) => {
   await productPage.addProductToCart(product1.name);
  await productPage.verifyCartCount(1);
  await productPage.removeProductFromCart(product1.name);
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
});

test("TC_008 Add multiple products to cart @cart ", async ({ page }) => {
   await productPage.addProductToCart(product1.name);
   await productPage.addProductToCart(product2.name);
  await productPage.verifyCartCount(2);
});

test("TC_009 Cart page should show selected products @cart ", async ({ page }) => {
   await productPage.addProductToCart(product1.name);
   await productPage.addProductToCart(product2.name);

   await productPage.goToCart();

  await expect(page).toHaveURL(/cart/);

  await cartPage.verifyProductInCart(product1.name);
  await cartPage.verifyProductInCart(product2.name);
});
