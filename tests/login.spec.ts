import {test, expect} from '@playwright/test';
import {users} from '../testdata/users';
import { LoginPage } from '../pages/LoginPage';
import {link} from '../utils/weblinks'

const standardUser= users[0];
const lockedUser=users[1];




test('TC_001 Login page should be visible and load completely @smoke', async ({page}) =>{
    
    const loginPage= new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginPageIsVisible;

});


test('TC_002 Valid user should login successfully @regression ', async({page}) =>{

    const loginPage= new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        standardUser.username,
        standardUser.password
    );
  await expect(page).toHaveURL(link.inventory)
});

test('TC_003 Invalid passowrd should show error @negative @regression', async({page})=>{

    const loginPage= new LoginPage(page);
    await loginPage.goto();   
    await loginPage.login(
        standardUser.username,
        'wrong_password'
    );
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
});

test('TC_004 Locked user should not be able to login @negative', async({page})=>{
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        lockedUser.username,
        lockedUser.password
    );
    await loginPage.verifyErrorMessage('locked out.');

});


