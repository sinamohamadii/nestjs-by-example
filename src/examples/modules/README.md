# Modules

> Learn how NestJS organizes applications into reusable, maintainable, and scalable building blocks using Modules.

---

# What you'll learn

By the end of this chapter, you will understand:

* What a Module is
* Why Modules exist
* The `@Module()` decorator
* Controllers, Providers, and Imports
* Exporting Providers
* Sharing functionality between Modules
* Feature Modules
* The Root Module (`AppModule`)
* Module boundaries
* Common architectural mistakes

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Services
* Basic routing
* Dependency Injection (high-level overview)

If you haven't completed the **Basics** chapter, it is recommended to do so first.

---

# Why this exists

As applications grow, placing everything inside a single folder quickly becomes difficult to maintain.

Modules allow you to organize related functionality into isolated features.

Instead of thinking about your application as one large codebase, think of it as a collection of independent building blocks.

Each Module owns its Controllers, Services, and business logic.

This approach makes applications easier to understand, test, and scale.

---

# Theory

A Module is a class annotated with the `@Module()` decorator.

It acts as a container that groups related components together.

A Module can contain:

* Controllers
* Providers (Services)
* Imports
* Exports

A typical application looks like this:

```text
AppModule
│
├── CustomersModule
├── ProductsModule
├── OrdersModule
└── PaymentsModule
```

Each feature is responsible for its own functionality.

Modules communicate with one another by exporting Providers and importing other Modules.

---

# How Nest handles this internally

When the application starts, NestJS scans every registered Module.

For each Module, Nest:

1. Registers Controllers.
2. Registers Providers.
3. Builds the Dependency Injection container.
4. Resolves dependencies.
5. Connects imported Modules.
6. Makes exported Providers available to other Modules.

The Dependency Injection container is built from your Module graph.

A simplified view looks like this:

```text
AppModule
      │
      ▼
ProductsModule
      │
exports ProductService
      │
      ▼
OrdersModule
      │
uses ProductService
```

This is why you import **Modules**, not individual Services.

---

# Scenario

In this chapter, we'll build a small e-commerce application composed of several independent Modules.

The goal is not to build a complete store, but to understand how Modules communicate with one another.

The application consists of four feature Modules:

* Customers
* Products
* Orders
* Payments

Each Module owns its own Controller and Service.

The Orders Module will consume functionality from the Products Module to demonstrate how Providers are shared.

---

# Folder structure

```text
modules/

├── README.md
├── requests.http
├── modules.module.ts
│
├── customers/
│   ├── customers.module.ts
│   ├── customers.controller.ts
│   └── customers.service.ts
│
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts
│   └── products.service.ts
│
├── orders/
│   ├── orders.module.ts
│   ├── orders.controller.ts
│   └── orders.service.ts
│
└── payments/
    ├── payments.module.ts
    ├── payments.controller.ts
    └── payments.service.ts
```

---

# Walkthrough

Throughout this chapter, we'll gradually build the application by:

1. Creating individual feature Modules.
2. Adding Controllers and Services.
3. Registering Providers.
4. Exporting Providers.
5. Importing Modules.
6. Injecting Services across Module boundaries.
7. Understanding the resulting dependency graph.

Each step introduces one new concept while building on the previous one.

---

# Try it yourself

After completing the examples, try the following exercises:

* Create an `InventoryModule`.
* Create a `ReviewsModule`.
* Export `ReviewsService`.
* Import `ReviewsModule` inside `ProductsModule`.
* Add a new endpoint that consumes the exported service.
* Remove an exported Provider and observe the resulting error.
* Try creating a circular dependency and investigate the error message.

Experimenting with the Module graph is one of the best ways to understand how NestJS works internally.

---

# Common mistakes

* Placing every feature inside `AppModule`.
* Importing Services instead of Modules.
* Forgetting to export Providers.
* Creating very large Modules with unrelated responsibilities.
* Creating circular dependencies.
* Ignoring feature boundaries.

---

# Best practices

* Group code by feature.
* Keep Modules focused on a single responsibility.
* Export only what other Modules need.
* Prefer composition over tightly coupled Modules.
* Keep Controllers thin and Services focused.
* Design clear boundaries between Modules.

---

# Related chapters

After completing this chapter, continue with:

* Dependency Injection
* Configuration
* Validation
* Guards
* Database

These topics build directly on the concepts introduced here.

---

# Summary

Modules are the foundation of every NestJS application.

Understanding how Modules organize features, expose Providers, and interact through the Dependency Injection container will make the rest of the framework significantly easier to learn.
