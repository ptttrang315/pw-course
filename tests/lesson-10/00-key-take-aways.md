# Interface and Type

Declare the type of properties of an object

```jsx
interface Gold {
    type: string;
    sell: number;
    buy: number;
}
```

or use **`type`**

```jsx
type Gold = {
    type: string;
    sell: number;
    buy: number;
}
```

Use:

```jsx
const gold1: Gold = {
    type: "sjc",
    sell: 2000,
    buy: 1900,
};
```

Some differents:

## Type

### Union

1.  Literal Union Type

```jsx
type Status = 'Done' | 'In Progress' | 'Not Started';
```

Use:

```jsx
let status: Status = 'Done';
```

1. Union Type

```jsx
type ID = string | number;
```

Use

```jsx
let userId: ID = 123;
userId = "abc";
```

Error when var is not string/ number

```jsx
let userID: ID = true
```

### Tuples

Fixed number of elements and fixed order of data types

```jsx
let user: [number, string];

user = [1, "Trang"];

// Error
user = ["Trang", 1];
```

### Intersection

```jsx
type Person = { name: string };
type Employee = { salary: number };
type Worker = Person & Employee;
```

## Interface

### Definition

When create an interface

```jsx
interface Items {
    name: string;
    price: number;
    amount: number;
    discount: number;
}
```

It means that is the template for data types of an object 

```jsx
let a = Items
// Return a
{ name: 'laptop', price: 20000, amount: 60000, discount: 10 }
```

“a” will be an object having all properties as interface

```jsx
let a = Items[]
// Return a as an object array
 [
    { name: 'laptop', price: 20000, amount: 60000, discount: 10 },
    { name: 'monitor', price: 5000, amount: 10000, discount: 5 }
    ]
```

“a” will be an array contains objects with the template of data type - interface

### Declaration Merging

```jsx
interface Person {
    name: string;
}

interface Employee extends Person {
    salary: number;
}
```

Use

```jsx
const emp: Employee = {
    name: "Trang",
    salary: 2000
};
```

**Note:  Unlike interfaces, types do not support declaration merging (you cannot declare a type with the same name multiple times to merge their properties).**


## ***When to use implements***

- Use `implements` when you want to ensure that a class contains specific properties and methods defined in an interface.
- It is useful when multiple classes provide the same functionality but implement it in different ways.

Example:

- UIUserCreator
- APIUserCreator
- DBUserCreator

```jsx
interface UserCreator {
    createUser(userInfo: UserInfo): Promise<void>;
}

class UIUserCreator implements UserCreator {
    async createUser(userInfo: UserInfo) {
        // Create user via UI
    }

    async searchUser(username: string) {
        // Search user on UI
    }

    async deleteUser(username: string) {
        // Delete user via UI
    }
}

class APIUserCreator implements UserCreator {
    async createUser(userInfo: UserInfo) {
        // Create user via API
    }

    async getUser(userId: string) {
        // Get user via API
    }

    async updateUser(userId: string) {
        // Update user via API
    }
}

class DBUserCreator implements UserCreator {
    async createUser(userInfo: UserInfo) {
        // Insert user into DB
    }

    async queryUser(userId: string) {
        // Query user from DB
    }
}
```

The interface only guarantees that every class has a `createUser()` method.

Each class can still have its own additional methods depending on its responsibility.

**NOTE:**

```jsx
UserCreator
└── createUser()

APIUserCreator
├── createUser()
├── getUser()
└── updateUser()
```

- If  defined by `APIUserCreator`
    
    ```jsx
    const creator = new APIUserCreator();
    // or
    const creator: APIUserCreator = new APIUserCreator();
    ```
    
    Can use
    
    ```jsx
    await creator.createUser(userInfo);
    await creator.getUser('123');
    await creator.updateUser('123');
    ```
    
- If defined by `UserCreator`
    
    ```jsx
    const creator: UserCreator = new APIUserCreator();
    ```
    
    CANNOT use methods of APIUserCreator
    
    ```jsx
    await creator.getUser('123');
    
    //Error: Property 'getUser' does not exist on type 'UserCreator'
    ```
    

## Why we should use class?

#### Object

```jsx
type User = {
	name: string;
	age: number;
	email: string;
};

const user1 = {
	name: 'Will',
	age: 13,
	email: 'will@mail.com'
}

const user2 = {
	name: 'Lucy',
	age: 20,
	email: 'lucy@mail.com'
}

function getUserInfo (user: User) {
	console.log(`${user.name} is ${user.age} years old`);
}

function getMail (user: User) {
	console.log(`Email is ${user.email}`);
}

// Use
getUserInfo(user1);
getMail(user2);
```

#### Class

```jsx
class Student {
	name: string;
	age: number;
	email: string;

	constructor(name: string, age: number, email: string){
		this.name = name;
		this.age = age;
		this.email = email;
	}

	getUserInfo () {
		console.log(`${this.name} is ${this.age} years old`);
}

	getMail () {
		console.log(`Email is ${this.email}`);
}
}

const student1 = new Student('Will', 20, 'will@email.com');
const student2 = new Student('Lucy', 15, 'lucy@email.com');

student1.getUserInfo();
student2.getMail();
```

Class:

- Easier object creation with constructor.
- Groups properties and methods together.
- user.getInfo() is clearer than getInfo(user).
- Better organization for large projects.

Type:

- Used to describe data shape only.

## Extends a class

It uses to inherit the properties and functions from another class

- `super()` is used to call the constructor of the parent class and pass arguments to it.
    
    ```tsx
    class LoginPage {
        userName: string;
        password: string;
    
        constructor (user: string, pwd: string) {
            this.userName = user;
            this.password = pwd;
        }
    
        fillUserInfo(user: string, pwd: string) {
            console.log(`Input user = ${user} and pwd ${pwd}`);
        }
    }
    
    class DashboardPage extends LoginPage {
        headingName: string;
    
        constructor(heading: string, user: string, pwd: string) {
            super(user, pwd);
            this.headingName = heading;
        }
    
        clickMenu(heading: string) {
            console.log(`Return ${heading} of account ${this.userName} and ${this.password}`)
        }
    }
    
    const dashboardPageObj = new DashboardPage('DashBoard', 'usertest', 'test@123');
    dashboardPageObj.fillUserInfo('trangUser', 'trang@test');
    dashboardPageObj.clickMenu('Trang Dashboard')
    ```
    
    When creating a `DashboardPage` instance, pass the username and password to the parent LoginPage constructor using `super()` to initialize the inherited properties.
    
- Use `export`  to reuse the Page Object/ utils(functions)/ const/ types/ interfaces
    
    ```jsx
    export class LoginPage{
    	// code
    	}
    
    //Go to another file 
    import { LoginPage } from '.page/login-page';
    ```
    

## POM

- Same as Class
    - Properties = elements of a web
    - Methods = actions on a page
- Without POM
    - Locators use in test
    - If UI changes, check the locators hard
    - Long code
    - Hard to read and maintain code
    - Unreusable