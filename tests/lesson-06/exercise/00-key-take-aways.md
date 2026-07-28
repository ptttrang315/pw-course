# GIT
## git remote add

Using for connect local repository to remote repository
`1. create a local repo` `2. create repo on Github` `3. use git remote add`

```jsx
git remote add <remote> <URL>
```

## git clone

Clone code

```jsx
git clone <URL>
```

If the folder is already existed, we can change the folder name when cloning repo

```jsx
git clone <URL> <new_folder_name>
```

## git push

Action: push a specific branch from local repository onto remote repo

```jsx
git push <remote_name> <branch_name>
```

## git pull

Action: pull code from remote repo to local

```jsx
git pull <remote_name> <branch_name>
```

## git stash

Save the working task into the temporary memory

```jsx
git stash
```

with message

```jsx
git stash push -m "<message>"
```

Recall the stash

```jsx
git stash pop
```

List stash

```jsx
git stash list
```

will return stash with id

then use command to apply

```jsx
git stash apply stash@{0}
```

## Create MR and review code

## Convention branch name

create branch

```jsx
<type>/<short-description>-name
```

type:

- feat: new feature
- fix: fix issue
- conf: update config
- chore: small update, remove/ change file name

# JavaScript
## Class

A blueprint declares objects have the same properties 

Instead of creating lots of objects with the same structure, we can use class as a template for declaring the type

In the past, create multiple objects having same structure and hard to trace

```jsx
const user1 = {
	name: "A",
	age: 20,
	sayHello: function() {
		console.log(`Hello ${name}`);
	}
	}
	
const user2 = {
	name: "B",
	age:30,
	sayHello: function() {
		console.log(`Hello ${name}`);
}
```

create 

```jsx
class User {
// properties
	name;
	age;

// constructor
constructor(name, role)	
	this.name = name;
	this.age = age;
	
//method
sayHello: function() {
		console.log(`Hello ${this.age}`);

}

const user1 = new User('UserName1', 20)

const user2 = new User('UserName2', 30)

user1.sayHello();
// print "Hello UserName1"

console.log(user2.age);
// print "30"
```

## `interface` and `type`
Declare the type of properties of an object

```
interface User {
    name: string;
    age: number;
}
```

or use **`type`**

```jsx
type User = {
    name: string;
    age: number;
}
```

Return

```jsx
const user: User = {
    name: "Trang",
    age: 28
};
```

Some differents:

### Type

1. When set value

```jsx
type Status = 'Done' | 'In Progress' | 'Not Started';
```

Use:

```jsx
let status: Status = 'Done';
```

1. When var has multiple data types

```jsx
type ID = string | number;
```

Use

```jsx
let userId: ID = 123;
userId = "abc";
```

### Interface

Use most in class

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