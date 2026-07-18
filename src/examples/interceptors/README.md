# Interceptors

> Learn how NestJS Interceptors add extra behavior around your controller. This chapter covers what Interceptors are, the `NestInterceptor` interface, running code before and after a handler, and reshaping responses through a simple logging and response-wrapping example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What Interceptors are
* Why Interceptors exist
* Where Interceptors execute in the request lifecycle
* The `NestInterceptor` interface
* Running code before and after the controller
* Measuring how long a request takes
* Transforming the response before it is sent
* Interceptor best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Guards

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Some behavior is needed by many routes but has nothing to do with business logic.

Examples include logging every request, measuring response time, or wrapping every response in the same standard shape.

Without Interceptors, each controller would repeat this code.

Interceptors let you wrap the controller with reusable behavior that runs **before** and **after** the handler, keeping controllers focused on real work.

---

# Theory

An Interceptor is a class that implements the `NestInterceptor` interface.

It sits around the controller and can:

* Run code before the controller executes.
* Run code after the controller executes.
* Transform the value the controller returns.
* Transform or handle errors.

An Interceptor receives a `CallHandler`. Calling `next.handle()` runs the controller and returns a stream (an RxJS `Observable`) that emits the response.

Anything you do before `next.handle()` runs first; anything you add with operators like `tap` or `map` runs after.

---

# How Nest handles this internally

When a request reaches your application, NestJS processes it through several layers.

For this chapter, the important part of the lifecycle is:

```text
HTTP Request
        │
        ▼
Guard
        │
        ▼
Interceptor (before)
        │
        ▼
Controller
        │
        ▼
Service
        │
        ▼
Interceptor (after)
        │
        ▼
Response
```

The same Interceptor wraps both sides of the controller call.

---

# Scenario

We'll build a small demo with three routes.

The application does not use a real database.

Its only purpose is to demonstrate how Interceptors observe and reshape a response.

We start with a plain route, then log timing around a route, and finally wrap a response in a standard envelope.

---

# Folder structure

```text
interceptors/

├── README.md
├── requests.http
├── interceptors.module.ts
├── interceptors.controller.ts
│
├── logging.interceptor.ts
└── transform.interceptor.ts
```

---

# Walkthrough

Throughout this chapter, we progressively add behavior around the handler.

### Step 1

Create a plain route with no Interceptor.

Observe that the response is returned exactly as written.

---

### Step 2

Create a `LoggingInterceptor`.

Log a message before the controller runs, then log again after it finishes—including how long it took.

Watch the logs appear in your server console.

---

### Step 3

Create a `TransformInterceptor`.

The controller still returns plain data, but the Interceptor wraps it in a standard shape:

```json
{
  "success": true,
  "data": { "name": "Monitor", "price": 300 }
}
```

---

# Example

Request:

```http
GET /interceptors/wrapped
```

Flow:

```text
HTTP Request

↓

TransformInterceptor (before) → nothing to do yet

↓

Controller returns { name: "Monitor", price: 300 }

↓

TransformInterceptor (after) → wrap the value

↓

Response: { success: true, data: { ... } }
```

The controller stays simple; the Interceptor shapes the final response.

---

# Try it yourself

After completing this chapter, try the following exercises:

### Exercise 1

Add the request method and URL to the wrapped response envelope.

---

### Exercise 2

Include a `timestamp` field in every wrapped response.

---

### Exercise 3

Apply `LoggingInterceptor` at the controller level so every route is logged.

---

### Exercise 4

Create an Interceptor that adds a custom response header.

---

### Exercise 5

Combine both Interceptors on the same route and observe the order they run in.

---

# Common mistakes

* Forgetting that code after `next.handle()` must go inside an operator like `tap` or `map`.
* Putting business logic inside an Interceptor.
* Returning a different shape from some routes, breaking a shared transform.
* Mutating the request in ways a Guard or Pipe should handle instead.
* Assuming an Interceptor runs before Guards (it runs after).

---

# Best practices

* Keep each Interceptor focused on one cross-cutting concern.
* Use `map` to transform responses and `tap` for side effects like logging.
* Prefer applying broad Interceptors globally instead of per route.
* Keep controllers unaware of the wrapping the Interceptor adds.
* Avoid heavy work inside Interceptors—they run on every wrapped request.

---

# Related chapters

After completing this chapter, continue with:

* Exception Filters
* Middleware
* Authentication

These features build on the same request lifecycle introduced here.

---

# Summary

Interceptors wrap your controller with reusable behavior that runs before and after the handler.

They are ideal for logging, timing, and reshaping responses—without cluttering your controllers.

By understanding Interceptors, you'll be able to add consistent, cross-cutting behavior across your application while keeping business logic clean.
