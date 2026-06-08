import {test, expect} from '@playwright/test';
import {users} from '../testdata/users';

const standardUser= users[0];
const lockedUser=users[1];


test('Login page should be visible and load completely', async ({page}) =>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});



test('Valid user should login successfully', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]', standardUser.username);
    await page.fill('[data-test="password"]',standardUser.password);
    await page.click('[data-test="login-button"]');
    await expect (page).toHaveURL(/inventory/);
    await expect (page.locator('.title')).toHaveText('Products');
})

test('Invalid passowrd should show error', async({page})=>{
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]',standardUser.username);
    await page.fill('[data-test="password"]','wrong_pswd');
    await page.click ('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
})

test('Locked user should not be able to login', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', lockedUser.username);
    await page.fill('[data-test="password"]', lockedUser.password);
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');

}
)


