## Overview 
This task automates saucedemo webiste using playwirght with typescript and the Page Object Model(POM) approach.

## Tools used :
Playwirght
TypeScript

## Project structure 

### pages
-CartPage.ts
-CheckoutPage.ts
-LoginPage.ts
-ProductPage.ts

### tests
-login.spec.ts
-checkout.spec.ts
-products-cart.spec.ts
-a11y.spec.ts

### testdata
-users.ts
-products.ts

## Tests performed 

### Login page 
1. TC_001 Login page should be visible and load completely
2. TC_002 Valid user should login successfully
3. TC_003 Invalid passowrd should show error
4. TC_004 Locked user should not be able to login

### Products and cart page 
5. TC_005 Product list should be visible after login
6. TC_006 Add one product to the cart
7. TC_007 Remove product from the cart
8. TC_008 Add multiple products to cart
9. TC_009 Cart page should show selected products

### Checkout page 
10. TC_010 Checkout with valid details
11. TC_011 Checkout with missing first name
12. TC_012 Checkout with missing postal code
13. TC_013 Checkout with missing last name
14. TC_014 Finish order and checkout-complete page

## How to run 
1. Install dependencies: npm install
2. Run all tests : npx playwright test
3. View report: npx playwright show-report
4. Run tests in headed mode :npx playwright test --headed 
5. Run tests in UI mode: npx playwright test --ui
  

