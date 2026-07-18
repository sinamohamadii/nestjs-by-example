# Middleware

> Learn how NestJS Middleware runs before anything else in the request lifecycle. This chapter covers what Middleware is, the `NestMiddleware` interface, the importance of calling `next()`, and how to apply middleware to routes through a simple logging and request-id example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What Middleware is
* Why Middleware exists
* Where Middleware executes in the request lifecycle
* The `NestMiddleware` interface
* Why calling `next()` matters
* Modifying the request before it reaches the controller
* Applying Middleware with `configure()` and `forRoutes()`
* Middleware best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Guards
* Interceptors

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Some work needs to happen for a request before any NestJS feature runs at all.

Examples include logging incoming requests, attaching a trace id, or setting up something the rest of the app depends on.

Middleware is the very first stop in the request lifecycle. It has access to the raw request and response objects—just like Express middleware—so it is the right place for this early, low-level work.

---

# Theory

Middleware is a class that implements the `NestMiddleware` interface (or a plain function).

Its `use(req, res, next)` method receives:

* `req` – the incoming request
* `res` – the outgoing response
* `next` – a function that passes control to the next handler

The most important rule: you must call `next()`.

If you forget, the request never continues and the client waits forever.

Middleware runs **before** Guards, Pipes, Interceptors, and the controller.

---

# How Nest handles this internally

When a request reaches your application, NestJS processes it through several layers.

For this chapter, the important part of the lifecycle is:

```text
HTTP Request
        │
        ▼
Middleware   ← you are here (runs first)
        │
        ▼
Guard
        │
        ▼
Interceptor (before)
        │
        ▼
Pipe
        │
        ▼
Controller
        │
        ▼
Response
```

Because Middleware runs first, it can prepare the request for everything that follows.

---

# Scenario

We'll build a small demo with one route.

The application does not use a real database.

Its only purpose is to demonstrate how Middleware runs before the controller and can change the request.

We attach a unique request id to every request and log each one to the console.

---

# Folder structure

```text
middleware/

├── README.md
├── requests.http
├── middleware.module.ts
├── middleware.controller.ts
│
├── logger.middleware.ts
└── request-id.middleware.ts
```

---

# Walkthrough

### Step 1

Create a `LoggerMiddleware` that logs the method and URL of every request, then calls `next()`.

---

### Step 2

Create a `RequestIdMiddleware` that generates a unique id, attaches it to the request, and adds it to the response as the `x-request-id` header.

---

### Step 3

Apply both middlewares in the module.

Unlike Guards or Interceptors, middleware is not applied with a decorator.

The module implements `NestModule` and wires middleware inside `configure()`:

```ts
consumer
  .apply(RequestIdMiddleware, LoggerMiddleware)
  .forRoutes('middleware');
```

Middleware runs in the order it is listed.

---

# Example

Request:

```http
GET /middleware/hello
```

Flow:

```text
HTTP Request

↓

RequestIdMiddleware → attach x-request-id

↓

LoggerMiddleware → log "GET /middleware/hello"

↓

Controller → read the request id and respond
```

The response includes an `x-request-id` header, and the server console shows the log line.

---

# Try it yourself

After completing this chapter, try the following exercises:

### Exercise 1

Log how long each request takes by storing a start time in the middleware.

---

### Exercise 2

Apply the logger to every route in the app instead of just `/middleware`.

---

### Exercise 3

Write the same logger as a functional middleware (a plain function) instead of a class.

---

### Exercise 4

Reject requests that are missing a required header before they reach the controller.

---

### Exercise 5

Exclude a specific route from the middleware using `.exclude()`.

---

# Common mistakes

* Forgetting to call `next()`, which leaves the request hanging.
* Putting authorization logic in middleware instead of a Guard.
* Sending a response from middleware and then calling `next()` as well.
* Assuming middleware can read route parameters or DTOs (it runs too early).
* Doing heavy work in middleware that runs on every request.

---

# Best practices

* Keep middleware small and focused on early, low-level work.
* Always call `next()` unless you intentionally end the request.
* Prefer Guards for authorization and Pipes for validation.
* Use middleware for cross-cutting concerns like logging and tracing.
* Be explicit about which routes middleware applies to.

---

# Related chapters

After completing this chapter, continue with:

* Authentication
* Exception Filters

These features build on the same request lifecycle introduced here.

---

# Summary

Middleware is the first layer a request passes through in NestJS.

It works with the raw request and response, is ideal for logging and tracing, and must always call `next()` to continue.

By understanding Middleware, you'll know where the request lifecycle begins and where to place early, low-level behavior that everything else depends on.
