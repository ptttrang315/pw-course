## Test structure (suites & tests)

Test suite supports group tests

`test.describe()`

```jsx
import { test, expect } from '@playwright/test';

test.describe('Login tests A', () => {
	test('should do something', async ({ page }) => {
		await page.goto('https://example.com');
	});
	
	test('should do something', async ({ page }) => {
		await page.goto('https://example.com');
	});

});
```

## Hooks

Hooks supports to run a code before/ after a test or test suite

```jsx
import { test } from '@playwright/test';

test.beforeAll(async () => {
	// runs once before all tests in the file/describe
});

test.beforeEach(async ({ page }) => {
	// runs before each test
});

test.afterEach(async ({ page }) => {
	// runs after each test
});

test.afterAll(async () => {
	// runs once after all tests
});
```

## Assertions (expect)

To check the result as expect

### Generic Assertions

#### Contain / not contain

Use for string/ array

`toContain()` / `not.toContain()` 

```jsx
expect(todoTexts).toContain('Todo 2'); 
expect(todoTexts).not.toContain('Todo 21');
```

#### To be equal

`expect(<actual>).toBe(<expect>)`

```jsx
expect(5+3).toBe(8)
```

#### To have length

`toHaveLength()`

```jsx
expect(arr).toHaveLength(<number>)
```

### Text & Content

#### To have text

`toHaveText()`

This function is able to check the array following the order

```jsx
expect(page.locator('//ul[@id="task-list"]/li/span')).toHaveText([
	'Todo 2', 'Todo 4', 'Todo 6', 'Todo 8', 'Todo 10'
]);
```

#### To contain text

Use when text from locator

`toContainText()`

```jsx
await expect(page.getByTestId('toast')).toContainText('Saved'); 
```

### Attributes & Properties

#### To Have Attribute

`toHaveAttribute()`

```jsx
await expect(locator).toHaveAttribute('href','/about')
```

#### To Have Class

`toHaveClass()` 

```jsx
<div class="container" id="ancestor">
```

```jsx
const a = page.locator('//div[@id="ancestor"]');
await expect(a).toHaveClass("container");
```

#### To Have Value

`toHaveValue()`

```jsx
await expect(locator).toHaveValue("")
```

### Page Assertions

#### To have URL

`toHaveURL()`

```jsx
await expect(page).toHaveURL(/dashboard/);
```

#### To have title

`toHaveTitle()`

```jsx
await expect(page).toHaveTitle(/Home/);
```

### **Web-First Assertions & Auto Waiting**

`toBeVisible()` /`toBeHidden()` 

`toBeEnabled()`/ `toBeDisabled()` 

`toBeChecked()` 

`toBeFocused()`

#### **❌ Non Web-First (Hard Wait)**

```jsx
await page.goto("https://material.playwrightvn.com/019-enable-form.html");

await page.waitForTimeout(10000);

const isEnabled = await page
  .locator("//button[@id='submitButton']")
  .isEnabled();

expect(isEnabled).toBe(true);
```

**Problems**

- Waits for a fixed time (10s) even if the button is enabled earlier.
- Test may fail if the button takes longer than 10s to become enabled.
- Slower and less stable.

#### **✅ Web-First Assertion**

```jsx
await page.goto("https://material.playwrightvn.com/019-enable-form.html");

const submitBtn = page.locator("//button[@id='submitButton']");

await expect(submitBtn).toBeEnabled();
```

**Benefits:**

- No fixed wait time is required.
- Playwright automatically retries until:
    - the button becomes enabled, or
    - the assertion timeout is reached.
- Faster and more reliable tests.