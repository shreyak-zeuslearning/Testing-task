import {test,expect} from '@playwright/test';
import { users } from '../testdata/users';
import { products } from '../testdata/products';

import {LoginPage} from '../pages/LoginPage';
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import {CheckoutPage} from '../pages/CheckoutPage';
import {link} from '../utils/weblinks'

const standard_user = users[0];
const product1 = products[0];
const product2 = products[1];

let loginPage:LoginPage;
let productPage:ProductPage;
let cartPage:CartPage;
let checkoutPage:CheckoutPage

test.beforeEach(async ({ page }) => {

    loginPage=new LoginPage(page);
    productPage= new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage=new CheckoutPage(page);
    
    await loginPage.goto();
    await loginPage.login(
        standard_user.username,
        standard_user.password
    );
    await productPage.addProductToCart(product1.name);
    await productPage.addProductToCart(product2.name);
    await productPage.goToCart();
    await cartPage.checkout();
    await expect(page).toHaveURL(link.checkOut1);
});

test("TC_010 Checkout with valid details @checkout @regression ",async({page})=>{
        await checkoutPage.fillCheckoutDetails('Jane','Doe','1009000');
        await checkoutPage.continueCheckout();
        await expect(page).toHaveURL(link.checkoutOverview);
        await expect(page.locator('.title')).toHaveText('Checkout: Overview')
});

test("TC_011 Checkout with missing first name @negetive @checkout ",async({page})=>{
        await checkoutPage.fillCheckoutDetails('','Doe','1009000');
        await checkoutPage.continueCheckout();
        await checkoutPage.verifyValidationMessage("Error: First Name is required");
});

test("TC_012 Checkout with missing postal code @negative @checkout",async({page})=>{
        await checkoutPage.fillCheckoutDetails('Jane','Doe','');
        await checkoutPage.continueCheckout();
        await checkoutPage.verifyValidationMessage("Error: Postal Code is required");
});

test("TC_013 Checkout with missing last name @negative @checkout",async({page})=>{
        await checkoutPage.fillCheckoutDetails('Jane','','1009000');
        await checkoutPage.continueCheckout();
        await checkoutPage.verifyValidationMessage("Error: Last Name is required");
});

test("TC_014 Finish order and checkout-complete page @smoke @checkout", async({page})=>{
        await checkoutPage.fillCheckoutDetails('Jane','Doe','1009000');
        await checkoutPage.continueCheckout();
        await expect(page).toHaveURL(link.checkoutOverview);
        await checkoutPage.finishOrder();
        await checkoutPage.verifyOrderConfirmation();          
}
);