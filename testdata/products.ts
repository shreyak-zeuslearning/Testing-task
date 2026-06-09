export interface Product {
    name:string;
    price?:string;
    addToCartLocator:string;
    removeFromCartLocator:string;
}

export const products: Product[] =[
{
    name:'Sauce Labs Backpack',
    price:'$29.99',
    addToCartLocator:'[data-test="add-to-cart-sauce-labs-backpack"]',
    removeFromCartLocator:'[data-test="remove-sauce-labs-backpack"]',
},

{
    name: 'Sauce Labs Bike Light',
    price:'$9.99',
    addToCartLocator:'[data-test="add-to-cart-sauce-labs-bike-light"]',
    removeFromCartLocator:'[data-test="remove-sauce-labs-bike-light"]',
}   
];
