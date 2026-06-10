import {test, expect} from '@playwright/test'

test('Adding items into cart', async ({page}) => {
    // Add product
    const addProduct = async (productNumber: number, quantity: number) =>{
        let finalTotalPrice = "$0.00";
        for(let count = 1; count <= quantity; count++){
            // Add item into cart
            await page.locator(`//button[@data-product-id='${productNumber}']`).click();

            // Get price of each product
            const productPrice = await page.locator(`//div[text()='Product ${productNumber}']/following-sibling::div[@class='product-price']`).textContent();
            
            // Check shipping cart
            finalTotalPrice = await verifyCart(productNumber, productPrice!, count);
        }
        return finalTotalPrice;
    }

    // Verify that shopping cart showing correctly 
    const verifyCart = async (productNumber: number, productPrice: string, quantity: number) => {
        // Get info from shipping cart
        // Get product name
        let productName = await page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']`).textContent();

        // Get price by each product
        let priceByProduct = await page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']/following-sibling::td[1]`).textContent();

        let price = Number(priceByProduct!.replace('$', ''));

        // Get quantity of each product
        let quantityOfEachProd = await page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']/following-sibling::td[2]`).textContent();

        // Get total price of each product
        let totalPriceOfEachProd = await page.locator(`//tbody[@id='cart-items']//td[text() = 'Product ${productNumber}']/following-sibling::td[3]`).textContent();

        // Assert values 
        expect(productName).toBe(`Product ${productNumber}`);
        expect(priceByProduct).toBe(productPrice);
        expect(quantityOfEachProd).toBe(`${quantity}`);
        expect(totalPriceOfEachProd).toBe(`$${(price * quantity).toFixed(2)}`);

        return totalPriceOfEachProd!;
    }
    
    type Product ={
        productName: string;
        quantity: number;
    }

    // Calculate total
    const calTotalPrice = async (products: Product[]) =>{
        let totalPriceOfEachProd = 0;

        for(let product of products){
            const totalPriceText = await addProduct(Number(product.productName.replace("Product ", "")), product.quantity);
            const totalPriceNumber = Number(totalPriceText.replace('$', ''));
            totalPriceOfEachProd = totalPriceOfEachProd + totalPriceNumber;

            // Get total price of each product
            console.log(`Price of ${product.quantity} ${product.productName} = ${totalPriceText}`);
        }
        console.log(`Total Price is $${totalPriceOfEachProd}`);

        // Get total price in Shopping Cart
        let totalPriceEle = await page.locator("//td[@class='total-price']").textContent();

        // Assert with total price in Shopping Cart
        expect(totalPriceEle).toBe(`$${totalPriceOfEachProd.toFixed(2)}`);    
    }

    
    const products: Product[] = [
        {productName: "Product 1", quantity: 2},
        {productName: "Product 2", quantity: 3},
        {productName: "Product 3", quantity: 1}           
    ]    

    await page.goto("https://material.playwrightvn.com/");
    await page.locator("//a[text() = 'Bài học 2: Product page']").click();

    await calTotalPrice(products);
});



