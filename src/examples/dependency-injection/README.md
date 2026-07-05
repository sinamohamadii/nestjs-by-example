# Dependency Injection

> Learn one of the most important concepts in NestJS and modern software architecture: Dependency Injection. Understand how NestJS creates, manages, and shares objects automatically, allowing you to build modular, maintainable, and testable applications.

---

# What you'll learn

By the end of this chapter, you will understand:

* What Dependency Injection (DI) is
* Why NestJS uses Dependency Injection
* What a Provider is
* Constructor Injection
* The Dependency Injection (DI) Container
* Singleton Providers
* Injection Tokens
* Custom Providers
* `useValue`
* `useClass`
* `useFactory`
* `useExisting`
* Optional Injection
* Common Dependency Injection patterns
* Common mistakes when working with Providers

---

# Prerequisites

Before starting this chapter, you should already understand:

* Modules
* Controllers
* Services
* Basic routing

It is highly recommended to complete the **Basics** and **Modules** chapters before continuing.

---

# Why this exists

As applications grow, manually creating objects becomes difficult to maintain.

Imagine every Service creating its own dependencies using the `new` keyword.

Soon you'll have hundreds of objects depending on one another, making your application tightly coupled and difficult to test.

NestJS solves this problem using Dependency Injection.

Instead of creating objects yourself, you simply declare what your class depends on, and NestJS automatically creates and injects those dependencies.

This results in applications that are easier to maintain, easier to test, and much more flexible.

---

# Theory

Dependency Injection is a design pattern where an object's dependencies are provided from the outside rather than created internally.

Instead of writing:

```text
NotificationService
      │
      └── new EmailService()
```

NestJS manages object creation for you.

The dependency flow becomes:

```text
Dependency Injection Container
            │
            ▼
      EmailService
            │
            ▼
NotificationService
            │
            ▼
NotificationController
```

Your classes simply declare their dependencies.

NestJS is responsible for creating them, resolving them, and sharing them throughout the application.

By default, every Provider in NestJS is a Singleton, meaning a single instance is shared wherever it is injected.

---

# How Nest handles this internally

When the application starts, NestJS performs several steps behind the scenes.

1. It scans every registered Module.
2. It discovers all Providers.
3. It builds the Dependency Injection Container.
4. It resolves constructor dependencies.
5. It creates Provider instances.
6. It injects those instances wherever they are required.

A simplified startup process looks like this:

```text
Application Starts
        │
        ▼
Nest scans Modules
        │
        ▼
Registers Providers
        │
        ▼
Builds DI Container
        │
        ▼
Resolves Dependencies
        │
        ▼
Application Ready
```

When a request arrives:

```text
HTTP Request
        │
        ▼
Controller
        │
        ▼
NotificationService
        │
        ▼
EmailProvider
        │
        ▼
LoggerProvider
        │
        ▼
Response
```

Notice that none of these objects are created manually.

NestJS manages the complete lifecycle of every Provider.

---

# Scenario

In this chapter, we'll build a simple Notification System.

The goal isn't to build a real notification platform.

Instead, we'll use a familiar example to explore how Dependency Injection works inside NestJS.

Throughout this chapter we'll gradually introduce:

* Constructor Injection
* Shared Providers
* Injection Tokens
* Custom Providers
* Configuration Providers
* Factory Providers
* Provider Aliases
* Singleton behavior (which is the default behavior of providers. We'll cover other scopes later in the project)

Each example introduces one new Dependency Injection concept while building upon the previous one.

---

# Folder structure

```text
dependency-injection/

├── README.md
├── requests.http
├── dependency-injection.module.ts
│
├── notifications/
│   ├── notifications.module.ts
│   ├── notifications.controller.ts
│   └── notifications.service.ts
│
├── providers/
│   ├── config.provider.ts
│   ├── email.provider.ts
│   ├── sms.provider.ts
│   ├── logger.provider.ts
│   └── tokens.ts
│
└── interfaces/
    └── notification.interface.ts
```

---

# Implementation

We'll build the Notification System incrementally.

The implementation progresses through the following concepts:

1. Constructor Injection
2. Injecting multiple Providers
3. Singleton Providers
4. Custom Injection Tokens
5. Registering Providers with `useValue`
6. Registering Providers with `useClass`
7. Registering Providers with `useFactory`
8. Registering Providers with `useExisting`
9. Optional Injection
10. Introducing a simple circular dependency

Each step demonstrates a single new concept while keeping the business logic intentionally simple.

---

# Walkthrough

A typical request follows this sequence:

```text
POST /notifications/email

↓

NotificationController

↓

NotificationService

↓

EmailProvider

↓

LoggerProvider

↓

Response
```

As new Provider types are introduced, the application logic remains unchanged.

Only the Dependency Injection configuration changes.

This demonstrates one of the biggest strengths of Dependency Injection: implementations can change without affecting the code that consumes them.

---

# Try it yourself

After completing this chapter, try implementing the following:

### Exercise 1

Create a new `PushNotificationProvider`.

---

### Exercise 2

Register the Provider using a custom Injection Token.

---

### Exercise 3

Replace the Email Provider using `useClass`.

---

### Exercise 4

Create a configuration Provider using `useFactory`.

---

### Exercise 5

Inject a custom application name using `useValue`.

---

### Exercise 6

Remove a Provider from the Module and observe the Dependency Injection error.

---

### Exercise 7

Create a circular dependency between two Services and investigate the resulting error.

---

# Common mistakes

### Creating dependencies manually

Avoid using the `new` keyword for application Services.

Always allow NestJS to manage object creation.

---

### Injecting interfaces

TypeScript interfaces do not exist at runtime.

Use Injection Tokens when injecting abstractions.

---

### Forgetting to register Providers

Every Provider must be registered inside a Module before it can be injected.

---

### Forgetting to export shared Providers

If another Module needs a Provider, it must first be exported.

---

### Creating unnecessary circular dependencies

Keep Providers focused on a single responsibility and avoid tightly coupling Services together.

---

# Best practices

* Prefer constructor injection.
* Let NestJS manage object creation.
* Keep Providers focused on a single responsibility.
* Use Injection Tokens for abstractions.
* Register custom Providers only when necessary.
* Keep business logic inside Services.
* Avoid circular dependencies whenever possible.
* Export only the Providers that need to be shared.

---

# Related chapters

Continue your learning with:

* Configuration
* Validation
* Middleware
* Guards
* Database
* Testing

These chapters build directly upon the Dependency Injection concepts introduced here.

---

# Summary

Dependency Injection is one of the core foundations of NestJS.

Understanding how Providers are created, managed, and injected will make the rest of the framework much easier to understand.

Nearly every advanced NestJS feature—Guards, Pipes, Interceptors, GraphQL, WebSockets, and Testing—relies on the Dependency Injection system introduced in this chapter.
