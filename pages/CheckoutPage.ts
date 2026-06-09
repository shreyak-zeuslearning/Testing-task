import {Page,Locator,expect } from '@playwright/test';
 
export class CheckoutPage{
  readonly page:Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly postalCode: Locator;
  readonly contButton: Locator;
  readonly finishButton:Locator;
  readonly errorMessage:Locator;

    constructor(page:Page){
        this.page=page;
        this.firstnameInput=page.locator('[data-test="firstName"]');
        this.lastnameInput=page.locator('[data-test="lastName"]');
        this.postalCode=page.locator('[data-test="postalCode"]');
        this.contButton=page.locator('[data-test="continue"]');
        this.finishButton=page.locator('[data-test="finish"]');
        this.errorMessage=page.locator('[data-test="error"]');
    }


    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) : Promise<void>{
        await this.firstnameInput.fill(firstName);
        await this.lastnameInput.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async   continueCheckout() : Promise<void>{
        await this.contButton.click();
    }

    async verifyValidationMessage(expectedMessage: string): Promise<void>{
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async finishOrder(): Promise<void>{
        await this.finishButton.click();
    }

    async  verifyOrderConfirmation(): Promise<void>{
        await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
    }

}