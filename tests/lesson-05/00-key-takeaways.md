## Function

### Simple function

Create a function to use it many times with other variables

```jsx
function calArea(length, width) {
    const area = length * width;
    return area;
}

console.log(`Area of rectangle ${calArea(5, 12)}`);
```

## Function expression

Set a variable for a function

`const var = function(parameter){}` 

Ex:

```jsx
const totalPrice = function(price, quantity, discount) {
    return price * quantity - discount;
}

console.log(`Total price = ${totalPrice(200, 2, 50)}`);
```

## Lambda function (Arrow)

Using `=>`  after the parameter instead of `function`

`const functName = function(var){}` 

Ex:

```jsx
const totalPrice = (price, quantity, discount) => {
    return price * quantity - discount;
}

console.log(`Total price = ${totalPrice(2_000, 2, 50)}`);
```

**Implicit return:**

If only have 1 coding row, don’t need use `{}`  and `return`

```jsx
const totalPrice = (price, quantity, discount) => price * quantity - discount;

console.log(`Total price = ${totalPrice(2_000, 2, 50)}`);
```

**Without parameters**

```jsx
const great = () => console.log("Hello");
```

**Only one parameter** 
Able to remove `( )`

```jsx
const double = x => x * 2;
```

## Anonymous function

Function but no name

`const functName = function(parameter){}` 

Ex:

```jsx
const totalPrice = function(price, quantity, discount) {
    return price * quantity - discount;
}

console.log(`Total price = ${totalPrice(200, 2, 50)}`);
```

Same as example of function expression 

But Function expression can have the function name

```jsx
const totalPrice = function cal(price, quantity, discount) {
    return price * quantity - discount;
}

console.log(`Total price 2= ${totalPrice(200, 2, 50)}`);
```


# DOM ( Document Object Model )

Using F12 or Inspect ⇒ Element tab 

A website will be structured as a tree with containers which cover the buttons, link,.. as nodes

## An element

`<option>United States</option>`

<>: called tags to wrap its content

### 1. Opening/ Closing tag

`<option value= "usa">United States</option>`

`<option>`: opening tag 

`</option>`: closing tag

`United States` : text

Properties and their values are only in opening tag

`value` :properties

`"usa"` : value of property

### 2. Self-closing tag

No content in element

`<img src="image.jpg" alt="Image description"/>`

- `<img>` : Insert photo
- `<br>`: break the row
- `<hr>` : insert a vertical line to separate the contents
- `<input>` : insert cells
- `<meta>/<link>` : provide the page config or external url

### 3. Types of tag

https://material.playwrightvn.com/035-DOM-elements.html

In real life,

#### Standard tag: from mozilla

`<html>` : Root of a page

`<head>` : the title

`<body>` : Content of whole website

`<div>` : block/ container to group html elements

`<span>` : is a container but use to declare format a part of doc

`<header>` : the header of a page

`<footer>` : the footer of a page

`<nav>` : navigating menu

`<section>` : main content

`<h1>` : the heading

`<p>`: a segment of text

`<ul>` : unorder list

`<ol>` : order list

`<table>` : create a table

`<thead>` : table head/ header section (whole the header row)

`<tbody>` : main content

`<tfoot>` : table footer/ foot of table

`<tr>` : create row

`<th>` : cell of header row

`<td>` : create data cell

`<colspan>` merge column

#### Important tags

`<form>` : create a form to collect user data

`<input>` : input cells

`<button>` : buttons

`<select>` : dropdown

`<textarea>` : are permit input segment of text

## Selector

### XPath - XML Path

- Almost cases
- Divers and be able to search difficult element
- quite long

    #### 2 types:

    #### A. Absolute XPath

    Start `/` from `<html>` go down to the target element

    ```jsx
    /html/body/div/h1
    ```

    #### B. Relative XPath

    #### 1. Simple xpath

    Start `//` based on their properties

    `//nameTag[@property="value]`

    ```jsx
    //form[@id="registration"]
    ```

    #### 2. Get an element by text

    `//nameTag[text() = "<text>"]`

    ```jsx
    //a[text() = ("<text>)"`
    ```

    #### 3. Get element by contains()

    `//nameTag[contains(text(), "<value>")]`

    #### 4. Get the element have the same level

    a. Go to the below element *`following-sibling::`*
        
    `//nameTag[predicate]/following-sibling::nametag[predicate]` 
        
    ```jsx
    const price = await page
        .locator("//div[text()='Product 1']/following-sibling::div[@class='product-price']")
        .textContent();
    
    console.log(price);
    ```
    

    b. Go to the below element **`preceding-sibling::`**

    `//nameTag[predicate]/preceding-sibling::nametag[predicate]` 

    ```jsx
    //div[@class='product-price']/preceding-sibling::div
    ```

    #### 5. Get the element of its parent

    Go to the parent element **`parent`**

    `//nameTag[predicate]/parent::nametag[predicate]` 

    ```jsx
    //label[text()='Email']/parent::div
    ```

    #### 6. Get the element of its ancestor

    Go to the parent element `ancestor`

    `//nameTag[predicate]/ancestor::nametag[predicate]`

### CSS selector

- Short, high performance
- For easy element
- Not flexible as XPath

### Playwright selector

- For only Playwright
- Short-hand Syntax, not depend on DOM structure

## Playwright actions
#### 1. Input
`fill` : same as pasting value into cell

`pressSequentially` : same as typing letter by letter

#### 2. Check/ uncheck

`isChecked` : check radio is check or not

`check` : check the radio

`setChecked(true/false)` check radio

#### 3. Select option

`selectOption("<value>")` 

For ex:

```jsx
await page.locator("//select[@id='country']").selectOption("Canada");

```

#### 4. Upload file

`setInputFiles("<file-path>")` 

```jsx
await page.locator("//input[@id='profile']").setInputFiles("tests/test-data.txt");

```

#### 5. hover()

`hover()` 

```jsx
await page.locator("//input[@id='profile']").setInputFiles("tests/test-data.txt");

```

#### 6. handle dialog

Must handle dialog before clicking button return dialog

```jsx
page.on('dialog', dialog => dialog.accept());

```

#### 7. handle toogle — click()/ check() with position

```jsx
    await page.locator('input#toggleOption').check({ 
        force: true, 
        position: { x: 0, y: 0 } 
    });
```

#### 8. handle rating/ slider — boundingBox with position

```jsx
    const box = await page.locator("//div[@id='starRating']").boundingBox();

    if(!box){
        throw new Error('Star is not visible'); 
    }

    await page.mouse.click(
        box.x + box.width * 0.92,
        box.y + box.height / 2
    );
```

`boundingBox`  return `x,y` of the box in the page

also return `width` and `height`  based on them return the position to click on the box

#### 9. count the number of rows of table

`count()`

```jsx
await page.locator('ul#task-list li').count();
```

#### 10. get all contexts of a table/ elememt

`allTextContents()` 

```jsx
await page.locator('//ul[@id="task-list"]/li/span').allTextContents();

```

#### 11. expect - contain

`toContain()` / `not.toContain()`

```jsx
expect(todoTexts).toContain('Todo 2'); 
expect(todoTexts).not.toContain('Todo 21'); 
```

#### 12. expect - to have text

`toHaveText()` 

This function is able to check the array following the order

```jsx
expect(page.locator('//ul[@id="task-list"]/li/span')).toHaveText(['Todo 2', 'Todo 4', 'Todo 6', 'Todo 8', 'Todo 10'])
```
