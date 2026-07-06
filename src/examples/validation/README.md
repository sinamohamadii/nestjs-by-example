# Validation

> Learn how NestJS validates incoming requests using DTOs, ValidationPipe, and class-validator to ensure your application only processes valid data.

---

# What you'll learn

By the end of this chapter, you will understand:

* Why request validation matters
* Data Transfer Objects (DTOs)
* `ValidationPipe`
* `class-validator`
* `class-transformer`
* Built-in validation decorators
* Nested validation
* Array validation
* Custom validation
* Data transformation
* Whitelisting
* Forbidding unknown properties
* Validation best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Modules
* Controllers
* Services
* Dependency Injection

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Applications receive data from users every second.

Unfortunately, users don't always send valid data.

Imagine a registration endpoint receiving:

```json
{
  "email": "not-an-email",
  "password": "12",
  "age": -5
}
```

If the application accepts this request, invalid data enters the system.

Validation prevents this by verifying every request before it reaches your business logic.

---

# Theory

Validation sits between the HTTP request and your controller.

Instead of allowing every request through:

```text
HTTP Request
      │
      ▼
Controller
```

NestJS performs validation first:

```text
HTTP Request
      │
      ▼
ValidationPipe
      │
      ▼
Controller
```

Only valid requests continue.

Invalid requests immediately receive a `400 Bad Request` response.

---

# How Nest handles this internally

When a request arrives:

1. NestJS receives the HTTP request.
2. The ValidationPipe reads the DTO attached to the route.
3. `class-transformer` converts the payload into a DTO instance.
4. `class-validator` checks every validation rule.
5. If validation succeeds, the controller executes.
6. If validation fails, NestJS returns a validation error.

Request flow:

```text
HTTP Request
        │
        ▼
ValidationPipe
        │
        ▼
class-transformer
        │
        ▼
class-validator
        │
        ▼
Controller
        │
        ▼
Response
```

---

# Scenario

We'll build a simple User Registration endpoint.

The endpoint will not save users to a database.

Instead, its only responsibility is validating incoming data.

As the chapter progresses, we'll add increasingly powerful validation rules while keeping the application logic exactly the same.

This allows us to focus entirely on how NestJS validates requests.

---

# Folder structure

```text
validation/

├── README.md
├── requests.http
├── validation.module.ts
│
├── dto/
│       ├── register-user.dto.ts
│       ├── address.dto.ts
│       └── profile.dto.ts
│
├── validators/
│   └── strong-password.validator.ts
│
└── decorators/
    └── is-strong-password.decorator.ts
```

---

# Implementation

We'll progressively improve the registration endpoint by introducing one validation concept at a time.

1. Create a DTO.
2. Enable ValidationPipe.
3. Validate required fields.
4. Validate strings and numbers.
5. Validate email addresses.
6. Add minimum and maximum constraints.
7. Transform incoming data.
8. Validate nested DTOs.
9. Validate arrays.
10. Create a custom validator.
11. Enable whitelisting.
12. Reject unknown properties.

Each step introduces one new validation feature while keeping the endpoint itself unchanged.

---

# Walkthrough

A registration request follows this flow:

```text
POST /validation/register

↓

ValidationPipe

↓

Validation controller

↓

Response
```

Notice that invalid requests never reach the controller.

Validation happens before any business logic executes.

---

# Try it yourself

After completing this chapter, try the following exercises:

### Exercise 1

Make the `phone` field optional.

---

### Exercise 2

Require passwords to contain uppercase letters.

---

### Exercise 3

Add a nested `StoryDto`.

---

### Exercise 4

Validate an array of phone numbers.

---

### Exercise 5

Enable automatic type conversion.

---

### Exercise 6

Enable `whitelist` and observe how extra properties are removed.

---

### Exercise 7

Enable `forbidNonWhitelisted` and observe the validation error.

---

# Common mistakes

* Forgetting to enable `ValidationPipe`.
* Using interfaces instead of DTO classes.
* Forgetting `@Type()` for nested objects.
* Assuming TypeScript types validate runtime data.
* Validating inside Services instead of using Pipes.
* Accepting unknown properties unintentionally.

---

# Best practices

* Validate every public endpoint.
* Keep validation rules inside DTOs.
* Use descriptive validation messages.
* Enable `whitelist` in production.
* Reject unknown properties when appropriate.
* Keep business logic separate from validation logic.

---

# Related chapters

Continue your learning with:

* Pipes
* Exception Filters
* Authentication
* Database
* Testing

These chapters build directly on the validation concepts introduced here.

---

# Summary

Validation is one of the first layers of defense in any backend application.

By validating requests before they reach your business logic, you ensure your application processes only clean, predictable, and trustworthy data, making it more secure, maintainable, and reliable.
