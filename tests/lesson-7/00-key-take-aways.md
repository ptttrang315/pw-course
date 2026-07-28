### Simple xpath

#### By attribute

Start `//` based on their properties

`//nameTag[@attribute="value]`

```jsx
//form[@id="registration"]
```

#### By text

`//nameTag[text() = "<text>"]` 

#### By contains()

`//nameTag[contains(text(), "<value>")]` 

If text is in multiple sub tag

```html
<button>
    Login
    <span>Now</span>
</button>
```

Use . instead of text()

`//button[contains(.,'Login')]`

### **Axis**

!Screenshot 2026-06-15 at 18.25.36.png

#### Example

```html

<html>
  <body>
    <div id="app">

      <section class="product-card">

        <div class="header">
          <h2>Product 1</h2>
          <span class="badge">New</span>
        </div>

        <div class="content">
          <p class="description">Nice item</p>

          <div class="pricing">
            <span class="currency">$</span>
            <span class="amount">10</span>
          </div>

          <button>Add to cart</button>
        </div>

      </section>

    </div>
  </body>
</html>
```

#### Get the element of its parent

 Go to the parent element **`parent`**

`//nameTag[predicate]/parent::nametag[predicate]` 

Current element: `//span[@class='amount']`

```jsx
//span[@class='amount']/parent::*
```

Result: 

```html
<div class="pricing">
```

#### Get the element of its ancestor

Get all previous generations of the current element

`//nameTag[predicate]/ancestor::nametag[predicate]` 

- get all ancestor that are `div`
    
    ```jsx
    //li/ancestor::div
    ```
    
- get all ancestor
    
    Current element: `//span[@class='amount']`
    
    ```jsx
    //span[@class='amount']/ancestor::*
    ```
    
    Result
    
    ```html
    div.pricing
    div.content
    section.product-card
    div#app
    body
    html
    // can use to count all ancestors
    ```
    

#### Get the element of its child

 Go to the child of current element

`//nameTag[predicate]/child::nametag[predicate]` 

Current element: `//div[@class='content']`

```jsx
//div[@class='content']/child::*
```

Result: 

```jsx
<p class="description">
<div class="pricing">
<button>
```

#### Get the elements of its descendant

Get all elements of the next generations in the current element

Current element: `//div[@class='content']`

```jsx
//div[@class='content']/descendant::*
```

Result: 

```jsx
<p class="description">
<div class="pricing">
<span class="currency">
<span class="amount">
<button>
```

#### Get the element have the same level

Return all elements have the same parent

1. Go to the below of the current element **`following-sibling::`**
    
    `//nameTag[predicate]/following-sibling::nametag[predicate]` 
    
    Current element: `//p[@class='description']`
    
    ```html
    //p[@class='description']/following-sibling::*
    ```
    
    Result:
    
    ```html
    <div class="pricing">
    <button>
    ```
    

b. Go to the above of current element **`preceding-sibling::`**

`//nameTag[predicate]/preceding-sibling::nametag[predicate]` 

Current element: `//button`

```jsx
//button/preceding-sibling::*
```

Result:

```html
<p class="description">
<div class="pricing">
```

#### Get the elements as same level and more

1. Go to all below elements of the current element **`following::*`** 
    
    Current element: `//h2`
    
    ```html
    //h2/following::*
    ```
    
    Result:
    
    ```html
    span.badge
    div.content
    p.description
    div.pricing
    span.currency
    span.amount
    button
    ```
    

b. Go to the above of current element **`preceding::`**

Current element: `//button`

```jsx
//button/preceding::*
```

Result:

```html
html
body
div#app
section
div.header
h2
span.badge
div.content
p.description
div.pricing
span.currency
span.amount
...
```

### Others

#### Wildcard *

Use to find all elements matching conditions

Maybe in some cases, element is updated.

For example:

```html
<button>Login</button>
```

Update

```html
<span>Login</span>
```

This will handle by text

```html
//*[contains(text(),'Login')]
```

#### And - Or

- And
    
    `//tagName[@attribute = "" and @attribute = ""]` 
    
    Use it when need to select exact element with multiple properties
    
    ```html
    //button[@id='login' and @class='primary']
    ```
    
- Or
    
    `//tagName[@attribute ="" or @attribute = ""]` 
    
    Use it when UI having multiple version 
    
    1 XPath but multiple conditions
    
    ```html
    //button[text()='Login' or text()='Sign In']
    ```
    
- |
    
    Combine multiple XPath
    
    Fetch the title from header and  footer
    
    ```html
    <header>
    <a>Contact</a>
    </header>
    ```
    
    ```html
    <footer>
    <a>Contact</a>
    </footer>
    ```
    
    XPath
    
    ```html
    //header//a
    |
    //footer//a
    ```
    

NOTE: Use | when different tagName

#### Normalize-space()

Use for trim the space of the text in element

`//tagName[normalize-space() = ""`

#### starts-with

`//tagName[starts-with(text(), ""]`

`//tagName[starts-with(@attribute, "")]`

#### not

`//tagName[not(condition)]`

```html
<button>Save</button>
<button disabled>Delete</button>
<button>Update</button>
```

```html
//button[not(@disabled)]
```

Return
```html
<button>Save</button>
<button>Update</button>
```