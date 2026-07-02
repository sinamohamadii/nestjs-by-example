# Basics

> Learn the fundamental building blocks of a NestJS application and understand how an HTTP request flows through the framework.

---

# What you'll learn

By the end of this chapter, you should be comfortable with:

* Creating Controllers
* Creating Services
* Creating Modules
* Understanding the relationship between Modules, Controllers, and Providers
* Defining routes using decorators
* Handling HTTP requests and responses
* Working with route parameters
* Working with query parameters
* Reading request bodies
* Returning JSON responses
* Understanding the request lifecycle at a high level

---

# Prerequisites

Before starting this chapter, you should have:

* Node.js installed
* Nest CLI installed
* The project cloned and running
* Basic knowledge of JavaScript or TypeScript
* Basic understanding of HTTP requests

Import this module into the app module and start the development server:

```bash
npm run start:dev
```

---

# Why this exists

Everything in NestJS is built upon a few core concepts.

If you understand how Controllers, Services, and Modules work together, learning advanced topics like Authentication, GraphQL, WebSockets, or Microservices becomes much easier.

Many developers coming from Express are tempted to put all of their logic inside route handlers.

NestJS encourages a different approach.

Instead of mixing everything together, it separates responsibilities into small, reusable components.

This chapter introduces that architecture.

---

# Theory

A NestJS application receives an HTTP request and passes it through several layers before returning a response.

A simplified request flow looks like this:

```text
HTTP Request
      │
      ▼
Nest Application
      │
      ▼
Router
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

Each layer has a specific responsibility.

### Module

Modules organize your application into logical features.

They tell NestJS which Controllers and Providers belong together.

Think of a Module as a container for related functionality.

---

### Controller

Controllers receive incoming HTTP requests.

Their responsibility is to:

* Receive requests
* Extract data
* Delegate work to services
* Return a response

Controllers should contain very little business logic.

---

### Service

Services contain the application's business logic.

A service should perform the actual work while remaining independent from HTTP concerns.

Controllers call Services instead of implementing logic themselves.

---

### Dependency Injection

NestJS automatically creates and injects service instances where they're needed.

Instead of manually creating objects, NestJS manages their lifecycle for you.

This is called Dependency Injection (DI), one of the core concepts of the framework.

We'll explore DI in depth in a later chapter.

---

# How Nest handles this internally

When the application starts, NestJS performs several steps behind the scenes.

1. It scans your application's Modules.
2. It discovers Controllers and Providers using decorators.
3. It builds a Dependency Injection container.
4. It registers application routes.
5. It starts the HTTP server.

When a request arrives:

```text
Client
    │
    ▼
Express / Fastify Adapter
    │
    ▼
Nest Router
    │
    ▼
Matching Controller Method
    │
    ▼
Service Method
    │
    ▼
Controller returns result
    │
    ▼
Nest serializes the response
    │
    ▼
Client
```

One important thing to remember:

Controllers usually **don't perform work**.

They coordinate work.

Services perform work.

---

# Implementation

The `basics` module demonstrates the smallest useful NestJS application.

During this chapter, we'll gradually build endpoints demonstrating:

* Basic GET requests
* Route parameters
* Query parameters
* POST requests
* PUT requests
* DELETE requests
* Returning JSON objects
* Injecting Services into Controllers

Each concept builds upon the previous one.

---

# Folder structure

```text
basics/

├── README.md
├── requests.http
├── basics.module.ts
├── basics.controller.ts
├── basics.service.ts
├── dto/
└── examples/
```

### basics.module.ts

Registers everything that belongs to this feature.

---

### basics.controller.ts

Defines HTTP endpoints and delegates work to the service.

---

### basics.service.ts

Contains the business logic for this chapter.

---

### requests.http

Contains ready-to-run HTTP requests for every endpoint implemented in this module.

---

### dto/

Contains Data Transfer Objects used for request validation.

Some DTOs will be introduced later in this chapter.

---

# Walkthrough

The simplest request follows this sequence:

```text
GET /basics/hello

↓

Controller receives request

↓

Controller calls BasicsService

↓

Service returns data

↓

Controller returns response

↓

Client receives JSON
```

Notice that the Controller doesn't generate the response itself.

It asks the Service to do the work.

This separation makes the application easier to test, maintain, and extend.

---

# Try it yourself

After completing this chapter, try implementing these endpoints on your own.

### Exercise 1

Create:

```
GET /basics/goodbye
```

Return a simple farewell message.

---

### Exercise 2

Create:

```
GET /basics/users/:id
```

Return the provided user ID.

---

### Exercise 3

Create:

```
GET /basics/search?name=John
```

Read the query parameter and return it.

---

### Exercise 4

Create:

```
POST /basics/users
```

Accept a JSON request body and return it.

---

### Exercise 5

Move all business logic into the Service.

The Controller should only coordinate the request.

---

# Common mistakes

### Putting business logic inside Controllers

Controllers should remain thin.

Business logic belongs in Services.

---

### Creating objects manually

Avoid using `new SomeService()`.

Always let NestJS inject dependencies.

---

### Returning inconsistent responses

Keep your API responses predictable.

Return structured JSON instead of random values.

---

### Ignoring Modules

Even small projects benefit from organizing related functionality into Modules.

---

### Mixing responsibilities

A Controller shouldn't validate business rules, access databases, or perform calculations.

Delegate those responsibilities to dedicated services.

---

# Best practices

* Keep Controllers small.
* Keep Services focused.
* Organize code by feature.
* Use descriptive method names.
* Prefer Dependency Injection over manual object creation.
* Return consistent JSON responses.
* Add DTOs as your API grows.
* Keep business logic out of Controllers.
* Build small, reusable components.

---

# Related chapters

Continue your learning with:

* Modules
* Dependency Injection
* Configuration
* Validation
* Pipes

These chapters build directly upon the concepts introduced here.

---

## Summary

In this chapter, you learned the fundamental architecture of a NestJS application.

Understanding the relationship between Modules, Controllers, Services, and Dependency Injection will make every upcoming topic significantly easier.

Everything else in NestJS builds upon these foundations.
