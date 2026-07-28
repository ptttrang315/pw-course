import {Page, Locator} from '@playwright/test';
import { MaterialBasePage } from './material-base-page';

type Product = {
    productName: string;
    quantity: number;
}

export class ProductPage extends MaterialBasePage {
    
    private addToCartBtn(id: number) {
        return this.page.locator(`//button[@data-product-id='${id}']`);
    };

    // In shopping cart
    private productName(productNumber: number) {
        return this.page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']`);
    }

    private cartPriceOfProduct(productNumber: number) {
        return this.page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']/following-sibling::td[1]`);
    }

    private cartQuantityByProduct(productNumber: number) {
        return this.page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']/following-sibling::td[2]`);
    }

    private cartTotalPriceByProd(productNumber: number) {
        return this.page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']/following-sibling::td[3]`);
    }

    xpathTotalPrice = '//td[@class="total-price"]';

    constructor(page: Page){
        super(page);
    }

    priceOfProduct = async (productNumber: number) => {
        let priceByProduct = await this.page.locator(`//div[text()='Product ${productNumber}']/following-sibling::div[@class='product-price']`).textContent();
        return Number(priceByProduct!.replace('$', ''));
    };

    totalPrice = async () => {
        let total = await this.page.locator(this.xpathTotalPrice).textContent();
        return Number(total!.replace('$', ''));
    }

    addProduct = async (productNumber: number, quantity: number) => {
        for(let count = 1; count <= quantity; count++){
            await this.addToCartBtn(productNumber).click();
        }
    }

    getQuantityAndPrice = async (productNumber: number) => {
        const productName = await this.productName(productNumber).textContent() ?? '';

        // Get price by each product
        const priceByProduct = await this.cartPriceOfProduct(productNumber).textContent();

        const price = priceByProduct ? Number(priceByProduct.replace('$', '')) : 0;

        // Get quantity of each product
        const quantityText = await this.cartQuantityByProduct(productNumber).textContent();
        const quantityOfEachProd = quantityText ?  Number(quantityText) : 0;

        // Get total price of each product 
        const totalPriceText = await this.cartTotalPriceByProd(productNumber).textContent();
        const totalPriceOfEachProd = totalPriceText ? Number(totalPriceText.replace('$', '')) : 0;  
          
        return {productName, price, quantityOfEachProd, totalPriceOfEachProd}
    }
}