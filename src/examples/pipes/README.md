# Pipes

> Learn how NestJS Pipes transform and validate incoming data before it reaches your controllers. This chapter covers built-in Pipes, custom Pipes, execution order, and best practices through a simple Product Lookup API.

---

# What you'll learn

By the end of this chapter, you will understand:

* What Pipes are
* Why Pipes exist
* Where Pipes execute in the request lifecycle
* Built-in Pipes
* Parameter transformation
* Input validation
* Creating custom Pipes
* Throwing exceptions from Pipes
* Applying Pipes globally, at the controller level, and at the route level
* Pipe best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Validation

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Every request sent to a NestJS application arrives as plain text.

For example:

```http
GET /pipes/products/123
```

Although `123` represents a number, the controller actually receives:

```ts
"123"
```

Without Pipes, every controller would need to manually convert and validate incoming values.

Pipes centralize this logic, keeping controllers clean while ensuring every request is transformed and validated before any business logic executes.

---

# Theory

A Pipe is a class that implements the `PipeTransform` interface.

Its responsibility is simple:

* Transform incoming data.
* Validate incoming data.
* Throw an exception if the data is invalid.

Pipes execute before the controller method is called.

If a Pipe throws an exception, the controller is never reached.

---

# How Nest handles this internally

When a request reaches your application, NestJS processes it through several layers.

For this chapter, the important part of the lifecycle is:

```text
HTTP Request
        │
        ▼
Route Parameters
        │
        ▼
Pipe
        │
        ├── Transform data
        ├── Validate data
        └── Throw exception if needed
        │
        ▼
Controller
        │
        ▼
Service
        │
        ▼
Response
```

This guarantees that controllers always receive clean, predictable data.

---

# Scenario

We'll build a simple Product Lookup API.

The application does not use a database or perform real product management.

Its only purpose is to demonstrate how Pipes transform and validate route parameters.

We'll start by receiving a product ID as a string and gradually improve the endpoint using both built-in and custom Pipes.

---

# Folder structure

```text
pipes/

├── README.md
├── requests.http
├── pipes.module.ts
│
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts
│   └── products.service.ts
│
└── custom-pipes/
    ├── parse-positive-int.pipe.ts
    └── trim-string.pipe.ts
```

---

# Walkthrough

Throughout this chapter, we'll progressively improve the Product Lookup API.

### Step 1

Receive a route parameter without using any Pipe.

Observe that every route parameter is received as a string.

---

### Step 2

Use `ParseIntPipe`.

Automatically convert:

```text
"123"
```

into:

```text
123
```

---

### Step 3

Trigger validation errors by sending invalid IDs.

Examples:

```text
abc
12abc
```

Observe how NestJS immediately returns a `400 Bad Request`.

---

### Step 4

Create your first custom Pipe.

Build a `ParsePositiveIntPipe` that:

* Converts strings into numbers.
* Rejects negative values.
* Rejects zero.
* Throws a `BadRequestException`.

---

### Step 5

Apply Pipes in different scopes.

Learn the difference between:

* Parameter-level Pipes
* Method-level Pipes
* Controller-level Pipes
* Global Pipes

---

### Step 6

Create another custom Pipe that trims incoming strings before the controller receives them.

This demonstrates that Pipes are not only for validation—they can also transform data.

---

# Example

Request:

```http
GET /pipes/products/25
```

Flow:

```text
HTTP Request

↓

ParsePositiveIntPipe

↓

Controller

↓

Service

↓

Response
```

Request:

```http
GET /pipes/products/abc
```

Flow:

```text
HTTP Request

↓

ParsePositiveIntPipe

↓

BadRequestException

↓

400 Bad Request
```

Notice that the controller is never executed.

---

# Try it yourself

After completing this chapter, try the following exercises:

### Exercise 1

Reject product IDs smaller than 1.

---

### Exercise 2

Create a Pipe that converts strings to uppercase.

---

### Exercise 3

Use `ParseUUIDPipe` instead of `ParseIntPipe`.

---

### Exercise 4

Create a Pipe that removes leading and trailing spaces from user input.

---

### Exercise 5

Apply a Pipe globally and compare its behavior with route-level Pipes.

---

# Common mistakes

* Parsing values manually inside controllers.
* Performing business logic inside Pipes.
* Forgetting that Pipes execute before controllers.
* Recreating functionality already provided by built-in Pipes.
* Throwing generic errors instead of NestJS exceptions.

---

# Best practices

* Prefer built-in Pipes whenever possible.
* Keep custom Pipes focused on a single responsibility.
* Avoid placing business logic inside Pipes.
* Reuse custom Pipes across multiple routes.
* Keep controllers free of transformation logic.

---

# Related chapters

After completing this chapter, continue with:

* Guards
* Interceptors
* Exception Filters
* Middleware

These features build on the same request lifecycle introduced here.

---

# Summary

Pipes are one of the first layers a request passes through in NestJS.

They ensure that controllers receive clean, validated, and properly transformed data, reducing boilerplate and making applications easier to maintain.

By understanding Pipes, you'll be able to build APIs that are more predictable, reusable, and resilient while keeping your business logic focused on solving real problems.
