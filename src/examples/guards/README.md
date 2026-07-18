# Guards

> Learn how NestJS Guards decide whether a request is allowed to reach your controller. This chapter covers what Guards are, the `CanActivate` interface, using the `Reflector` to read route metadata, and applying multiple Guards through a simple API-key and roles example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What Guards are
* Why Guards exist
* Where Guards execute in the request lifecycle
* The `CanActivate` interface
* Reading the request inside a Guard
* Creating a custom decorator with metadata
* Reading metadata with the `Reflector`
* Applying multiple Guards to a single route
* Guard best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Pipes

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Some routes should not be open to everyone.

A request might need a valid API key, a logged-in user, or a specific role before it is allowed to run.

Without Guards, every controller would repeat the same "is this caller allowed?" checks by hand.

Guards centralize that decision. They run **before** the controller and either let the request through or reject it—keeping authorization logic in one place and out of your business code.

---

# Theory

A Guard is a class that implements the `CanActivate` interface.

Its only job is to answer a single question:

* Should this request be allowed to continue?

A Guard returns `true` to allow the request or `false` (or throws an exception) to block it.

Guards execute after Pipes have run but before the controller method is called.

If a Guard blocks the request, the controller is never reached.

---

# How Nest handles this internally

When a request reaches your application, NestJS processes it through several layers.

For this chapter, the important part of the lifecycle is:

```text
HTTP Request
        │
        ▼
Middleware
        │
        ▼
Guard
        │
        ├── Read the request (headers, user, etc.)
        ├── Read route metadata (e.g. required roles)
        └── Allow or reject the request
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

This guarantees that a controller only runs when the request is authorized.

---

# Scenario

We'll build a small "protected area" API.

The application does not use a real database or a full authentication system.

Its only purpose is to demonstrate how Guards allow or block requests.

We start with a public route, then protect a route with an API key, and finally require a specific role.

---

# Folder structure

```text
guards/

├── README.md
├── requests.http
├── guards.module.ts
├── guards.controller.ts
│
├── api-key.guard.ts
├── roles.guard.ts
└── roles.decorator.ts
```

---

# Walkthrough

Throughout this chapter, we progressively protect the API.

### Step 1

Create a public route with no Guard.

Observe that anyone can call it.

---

### Step 2

Create an `ApiKeyGuard` that checks the `x-api-key` header.

Requests without a valid key receive a `401 Unauthorized`.

---

### Step 3

Create a `Roles` decorator and a `RolesGuard`.

The decorator attaches the required roles to a route as metadata.

The Guard uses the `Reflector` to read that metadata and compares it to the caller's role.

Apply both Guards to the same route and watch them run in order.

---

# Example

Request:

```http
GET /guards/admin
x-api-key: secret-123
x-user-role: admin
```

Flow:

```text
HTTP Request

↓

ApiKeyGuard   → valid key, allow

↓

RolesGuard    → role is "admin", allow

↓

Controller

↓

Response
```

Request:

```http
GET /guards/admin
x-api-key: secret-123
x-user-role: customer
```

Flow:

```text
HTTP Request

↓

ApiKeyGuard   → valid key, allow

↓

RolesGuard    → role is not "admin"

↓

ForbiddenException

↓

403 Forbidden
```

Notice that the controller is never executed when a Guard rejects the request.

---

# Try it yourself

After completing this chapter, try the following exercises:

### Exercise 1

Add a second valid API key and allow either one.

---

### Exercise 2

Allow more than one role, for example `@Roles('admin', 'manager')`.

---

### Exercise 3

Move the valid API key into configuration instead of hard-coding it.

---

### Exercise 4

Apply `ApiKeyGuard` at the controller level so every route is protected.

---

### Exercise 5

Create a Guard that only allows requests during business hours.

---

# Common mistakes

* Putting authorization checks inside controllers instead of Guards.
* Returning `false` when a clear exception would give the client a better message.
* Forgetting that Guards run before the controller, not after.
* Reading metadata manually instead of using the `Reflector`.
* Placing business logic inside a Guard.

---

# Best practices

* Keep each Guard focused on a single decision.
* Throw meaningful exceptions (`UnauthorizedException`, `ForbiddenException`).
* Use decorators and the `Reflector` for anything configurable per route.
* Reuse Guards across routes instead of copying logic.
* Keep controllers free of authorization logic.

---

# Related chapters

After completing this chapter, continue with:

* Interceptors
* Exception Filters
* Middleware
* Authentication

These features build on the same request lifecycle introduced here.

---

# Summary

Guards are the layer that decides whether a request is allowed to reach your controller.

They keep authorization logic in one place, run before any business code, and can read both the request and route metadata to make their decision.

By understanding Guards, you'll be able to protect routes cleanly and consistently while keeping your controllers focused on real work.
