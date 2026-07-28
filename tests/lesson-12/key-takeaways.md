## POM API

- Use for creating the method following the API request for each page
    
    ```jsx
    import { APIRequestContext } from '@playwright/test';
    import { UserInfo } from '../data-test/user-data';
    
    export class ApiUtils {
        private request: APIRequestContext;
        private baseURL: string = 'https://material.playwrightvn.com/api/user-management/v1';
        
        constructor(request: APIRequestContext) {
            this.request = request;
        }
    
        login = async (email: string, pwd: string) => {
            const response = await this.request.post(`${this.baseURL}/login.php`, {
                    data: {
                        email: email,
                        password: pwd
                    }
            });
            return {
                status: response.status(), 
                body: await response.json()
            };
        }
    }
    ```
    
- Save baseURL when calling API
- Add token as a property

## POM Styles

### Inherit

Style uses as `extend`  of a class, when declare a class ( extend to another) and use the methods from extended class

```jsx
class ProductPage extends HomePage
const productPage = new ProductPage();
// navigateTo method from HomePage
productPage.navigateTo('product');
productPage.addToCart('product1');
```

### POM manager

Define a `pomManager`  then other page call pomManage

? Singleton - Factory: Design pattern

```jsx
const pomManager = new PomManager();
const homePage = pomManager.get('home_page');
const productPage = pomManager.get('product_page');

homePage.navigateTo('product');
productPage.addToCart('product1');
```

### Return other POM

Create and separate the different pages (not extend class)

- When define a method, then return to another page

## Async and Await

#### Definition

- Async: when define a method  to make it a async function (promise)
- Await: supports to wait until the step done before going to the next step
    
    — can check the function which return `Promise` 
    

#### Methods with async await

`page.goto()` 

`page.click()`

`page.fill()`

`expect`

methods return Promise