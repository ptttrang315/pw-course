import { test, expect } from '@playwright/test';
import { MaterialBasePage } from './pages/material-base-page';
import { ProductPage } from './pages/product-page';

test('Adding items into cart', async ({page}) => {
    const materialBasePage = new MaterialBasePage(page);
    const productPage = new ProductPage(page);
    
    const products = [
        {productName: "Product 1", quantity: 2},
        {productName: "Product 2", quantity: 3},
        {productName: "Product 3", quantity: 1}           
    ]    

    await test.step('Go to Material page', async () => {
        await materialBasePage.openMaterialPage();
        await expect(materialBasePage.heading('Tài liệu học automation test', 1)).toBeVisible();
    });

    await test.step('Go to Product page', async () => {
        await materialBasePage.gotoPage('Product page');
        await expect(productPage.heading('Simple E-commerce',1)).toBeVisible();
    });

    await test.step('Add products', async () => {
        let finalTotalPrice = 0;
        for(let product of products){

            // Add product and its quantity
            let number = Number(product.productName.replace("Product ", ""));
            await productPage.addProduct(number, product.quantity);

            // Get price of item in product section
            const priceByItem = await productPage.priceOfProduct(number);

            // Get Product Name, Price, Quantity and Total of each product
            const productItem = await productPage.getQuantityAndPrice(number);

            // Verify data in Shopping Cart
            expect(productItem.productName).toBe(product.productName);
            expect(productItem.price).toBe(priceByItem);
            expect(productItem.quantityOfEachProd).toBe(product.quantity);
            expect(productItem.totalPriceOfEachProd).toBe(product.quantity * priceByItem);

            finalTotalPrice = finalTotalPrice + product.quantity * priceByItem;
        }

        // Verify total amount        
        let totalPrice = await productPage.totalPrice();
        expect(totalPrice).toBe(finalTotalPrice);

    });
});



