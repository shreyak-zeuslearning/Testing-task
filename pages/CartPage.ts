import {Page,Locator,expect } from '@playwright/test';

export class CartPage{

    readonly page:Page;
    readonly checkoutButton:Locator;
    readonly contShoppingButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.checkoutButton=page.locator('[data-test="checkout"]');
        this.contShoppingButton=page.locator('[data-test="continue-shopping"]');
    }


    async verifyProductInCart(productName: string) : Promise<void>{
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async  removeProduct(productName: string) : Promise<void>{
        await this.page.locator('.cart_item').filter({hasText:productName}).getByRole('button',{name:'Remove'}).click();
    }

    async continueShopping(): Promise<void>{
        await this.contShoppingButton.click();
    }

    async checkout(): Promise<void>{
        await this.checkoutButton.click();
    }

}