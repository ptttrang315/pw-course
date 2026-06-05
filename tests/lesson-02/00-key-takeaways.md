# Lesson 2
# Git

<aside>
💡 Supports user manage the version control system

</aside>

## Three states

1. `git init`  creates 3 stages — files ready to use git
2. The files are in **Working Directory**
3. `git add` transfers files into **Staging Area**
4. `git commit -m "<>"` creates a new version into **Repository** as a commit

<aside>
✏️ Key words

- Working Directory: draft files
- Staging Area: prepared area
- Repository: contains commits (versions)
</aside>

## **Config user**

```jsx
git config --global user.name "Trang Pham"
git config --global user.email "trangptt315@gmail.com"
git config --global init.defaultBranch main
git config --list
```

Tell git who you are

## **A. Push new code into new empty repo**

1. Copy URL of repo in Github
2. Create repo local ( for using git )
    
    ```jsx
    git init
    ```
    
3. Link repo Github and repo local
    
    ```jsx
    git remote add origin <URL>
    ```
    
4. Add new updates
5. Commit
6. Push code to Github repo
    
    ```jsx
    git push origin main
    ```


# JavaScript

## Var - Let - Const
Var: Can declare the value

Let: Only declare once

Const: Cannot update the value

## Data types

### Primitive types

#### Number - String - Boolean
```
let name = "John";

let msg = "Hi";

let template = `${msg}, my name is ${name}`;

const isActive = true;

const age = 17;

console.log(template);

console.log(typeof age);

console.log(typeof isActive);
```
Return
```
Hi, my name is John
number
boolean
```

## Operator

1. == and ===
    
    ```
    console.log(`c === d: `, c === d);
    // Return the true/ false when a and b have the same type
    // If they have different types => return false
    ```
    
2. =!
3. .>, <, <=, >=    
    ```
    const a = 5;
    const b =10;

    console.log(`a = `, a);
    console.log(`b = `, b);

    console.log(`a == b: `, a == b);

    console.log(`5 == "5": `, 5 == "5");
    // Change "5" as a string to 5 as a number then compare as numbers

    console.log(`true == 1: `, true == 1);
    // Change 1 as a number to "true" as a boolean then compare as boolean


    const c = 50;
    const d = "50";

    console.log(`c = `, c);
    console.log(`d = `, d, `as a string`);

    console.log(`c === d: `, c === d);
    // Return the true/ false when a and b have the same type
    // If they have different types => return false

    console.log(`c == d: `, c == d);

    console.log(`a != b: `, a != b);

    console.log(`a > b: `, a > b);

    console.log(`a < b: `, a < b);

    ```
    Return 
    ```
    a =  5
    b =  10
    a == b:  false
    5 == "5":  true
    true == 1:  true
    c =  50
    d =  50 as a string
    c === d:  false
    c == d:  true
    a != b:  true
    a > b:  false
    a < b:  true
    ```

4. && and ||
5. a++, ++a
    ```let a = 10;
    console.log(`a = `, a);

    b = a++;
    console.log(`a++ = `, b);
    // return a = 10 then a + 1 = 11

    c = ++a;
    console.log(`++a = `, c);
    // a + 1 = 11 + 1 = 12 then return a = 12
    ```
    Return 
    ```
    a =  10
    a++ =  10
    ++a =  12
    ```
6. +, -, *, /

## Conditions
### IF 
```
let hour = 14;

if (hour <= 12) {
    console.log("Good morning");
}

if (hour > 12) {
    console.log("Good evening");
}
```
Return
```
Good evening
```

### For
```
let i = 10;
for (let a = 0; a < i; a++) {
    console.log(`a = `, a);
}
```
Return
```
a =  0
a =  1
a =  2
a =  3
a =  4
a =  5
a =  6
a =  7
a =  8
a =  9
```