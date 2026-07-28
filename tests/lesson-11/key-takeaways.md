# Definition

> API: Application Programming Interface
> 
- Relationship between clients and server
- API provides the communication ways to support different systems working together

**Why we need API testing?**

- Make sure system working correctly
- Approach issue in early stage
- Check security
- Check performance/ load

# Part of API

https://material.playwrightvn.com/039-http-method.html

## URL

 `https://www.googleapis.com/books/v1/volumes?q=harry+potter`

- baseURL: `https://www.googleapis.com`
- protocol : `https`
- hostname: `www.googleapis.com`
    - subdomain:  `www`
    - domain: `googleapis`
- top level domain (TLD): `com`
- path/ endpoint: `/books/v1/volumes`
- query param: `q=harry+potter`
- resource: `/books`

## HTTPS Methods

`GET` : Retrieve data

`POST` : Create new data

`PUT` : Replace an existing resource

`PATCH` : Partially update a resource

`DELETE` : Remove a resource

`HEAD` 

`OPTIONS`

## Request

### Headers: contains instructions/ metadata

- Authentication (Authorization)
    
    ```jsx
    Authorization: Bearer eyJ...
    ```
    
- Data format (Content-Type)
    
    ```jsx
    Content-Type: application/json
    ```
    
- Expected response format (Accept)
    
    ```jsx
    Accept: application/json
    ```
    
- Language settings (Accept-Language)
    
    ```jsx
    Accept-Language: en-US
    ```
    
- Caching (Cache-Control): Check cache or not
    
    ```jsx
    Cache-Control: no-cache
    ```
    
- Tracing and debugging (X-Correlation-ID): All services will have log `abc123`
    
    ```jsx
    X-Correlation-ID: abc123
    ```
    
- Client information (User-Agent): Request from
    
    ```jsx
    User-Agent: PostmanRuntime
    ```
    

### Parameters: uses for filtering, sorting, searching, pagination

- Query Paramter
    
    ```jsx
        q=harry+potter
    ```
    
- Purpose of Query Parameters:
    - Filtering:
        
        /users?status=active
        
    - Sorting:
        
        /users?sort=name
        
        /users?sort=-createdDate
        
    - Searching:
        
        /books/v1/volumes?q=harry+potter
        
    - Pagination:
        
        /users?page=1&limit=20
        

### Body: contains the data sent to the server

- POST
- PUT
- PATCH

## Response: data returned from the server

### Status Code

https://material.playwrightvn.com/038-status-code.html

- 2xx - Success
    
    ```jsx
    200 OK
    201 Created
    204 No Content
    ```
    
- 4xx - Client Errors
    
    ```jsx
    400 Bad Request
    401 Unauthorized
    403 Forbidden
    404 Not Found
    409 Conflict
    ```
    
- 5xx - Server Errors
    
    ```jsx
    500 Internal Server Error
    502 Bad Gateway
    503 Service Unavailable
    ```
    

### Response Headers

```jsx
Content-Type: application/json; charset=UTF-8
Content-Length: 12345
Cache-Control: private, max-age=0
Date: Tue, 24 Jun 2026 15:00:00 GMT
```

- Content-Type: response data format
- Content-Length: response size
- Cache-Control: caching behavior
- Date: response timestamp

### Response Body

Actual data returned by the server.

```jsx
{
  "kind": "books#volumes",
  "totalItems": 1000000,
  "items": [
    {
      "id": "abcd123",
      "volumeInfo": {
        "title": "Harry Potter and the Sorcerer's Stone",
        "authors": [
          "J.K. Rowling"
        ]
      }
    }
  ]
}
```

Contains the business data requested by the client.

# Playwright API

App: https://material.playwrightvn.com/api/todo-app/

API doc:https://material.playwrightvn.com/api/todo-app/swagger.html#/todos/getTodoById

## POST

```tsx
import { test, request } from '@playwright/test';
let id;
test("1. Create todo", async ({ request }) => {
    const response = await request.post('https://material.playwrightvn.com/api/todo-app/v1/todo.php',{
        data: {
        "title": "Xin chao, toi la Trang",
        "description": "Write comprehensive docs",
        "status": "pending",
        "priority": "high",
        "user_id": 1
        }
    }) ;
    const responseJson = await response. json();
    console. log(responseJson) ;
    id = responseJson.todo.id;
}) ;
```

## GET

- Get all todos
    
    ```tsx
    test('2. Get todos', async ({ request }) => {
        const response = await request.get('https://material.playwrightvn.com/api/todo-app/v1/todos.php');
        console.log(await response.json());
    })
    ```
    
- Get a todo
    
    ```tsx
    test('3. Get a todo', async ({ request }) => {
        let idTodo = 51;
        const response = await request.get(`https://material.playwrightvn.com/api/todo-app/v1/todo.php?id=${idTodo}`);
        console.log(await response.json());
    })
    ```
    

## PATCH

```tsx
test('4. Update todo title', async ({ request }) => {

    const response = await request.put('https://material.playwrightvn.com/api/todo-app/v1/todo.php',{
        data: {
            id: 51,
            title: 'Update new title - Trang Trang'
            }
    });
    console.log(response.status());
    console.log(await response.json());
});

```

## DELETE

```tsx
test('5. Delete todo title', async ({ request }) => {
    const response = await request.delete('https://material.playwrightvn.com/api/todo-app/v1/todo.php',{
        data: {
            id: String(id),
            }
    });
    console.log(response.status());
    console.log(await response.json());
});
```