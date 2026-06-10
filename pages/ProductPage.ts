import {Page,Locator,expect } from '@playwright/test';

export class ProductPage{

    readonly page:Page;
    readonly productList: Locator;
    readonly cartLink:Locator;
    readonly cartBadge:Locator;
    readonly inventoryItems:Locator;

    constructor(page:Page){
        this.page=page;
        this.inventoryItems=page.locator('[data-test="inventory-item"]');
        this.productList=page.locator('[data-test="inventory-list"]');
        this.cartLink=page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge=page.locator('[data-test="shopping-cart-badge"]');
    }


    async verifyProductsPageIsVisible() : Promise<void>{
        await expect(this.productList).toBeVisible();
        await expect(this.inventoryItems).toHaveCount(6);

    }

    async addProductToCart(productName: string) : Promise<void>{
        await this.page.locator('.inventory_item').filter({hasText:productName}).getByRole('button').click();
    }

    async removeProductFromCart(productName: string) : Promise<void>{
        await this.page.locator('.inventory_item').filter({hasText:productName}).getByRole('button',{name:'Remove'}).click();
    }

    async goToCart() : Promise<void>{
        await this.cartLink.click();
    }

    async  verifyCartCount(expectedCount: number) : Promise<void>{
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }

}