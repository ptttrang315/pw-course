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

## Operator

1. == and ===
    
    ```
    console.log(`c === d: `, c === d);
    // Return the true/ false when a and b have the same type
    // If they have different types => return false
    ```
    
2. =!
3. .>, <, <=, >=
4. && and ||
5. a++, ++a
    
    ![Screenshot 2026-06-04 at 17.17.23.png](JavaScript/Screenshot_2026-06-04_at_17.17.23.png)
    
6. +, -, *, /

## Conditions
