# ATTENTION
This Project Is Currently Under Development!

## 📊 Project Progress

**Overall Progress:** 3 / 21 chapters completed (9.5%)


| Chapter | Status |
|---------|--------|
| ✅ Basics | Complete |
| ✅ Modules | Complete |
| ✅ Dependency Injection | In Progress |
| 🟡 Configuration | Planned |
| ⬜ Validation | Planned |
| ⬜ Pipes | Planned |
| ⬜ Guards | Planned |
| ⬜ Interceptors | Planned |
| ⬜ Filters | Planned |
| ⬜ Middleware | Planned |
| ⬜ Authentication | Planned |
| ⬜ Database | Planned |
| ⬜ Upload | Planned |
| ⬜ Cache | Planned |
| ⬜ Events | Planned |
| ⬜ Cron | Planned |
| ⬜ Queues | Planned |
| ⬜ WebSockets | Planned |
| ⬜ GraphQL | Planned |
| ⬜ Testing | Planned |
| ⬜ OpenAPI | Planned |

# NestJS by Example 🚀

> **Learn NestJS through practical, production-inspired examples.**

`nestjs-by-example` is an open-source repository dedicated to helping developers understand **how NestJS actually works**—not just how to build a Todo API.

Whether you're coming from Express, Next.js, Spring Boot, Laravel, or any other backend framework, this project aims to bridge the gap between the official documentation and real-world application architecture.

---

# Why This Project Exists

When I started learning NestJS, I quickly realized that while the official documentation is excellent, there weren't many complete, practical examples that showed how different parts of the framework fit together in a real application.

Most tutorials stop after authentication or CRUD APIs.

Most example repositories are either:

* Too simple to be useful
* Too complex to follow
* Missing explanations
* Outdated
* Focused on one specific use case

This repository exists to solve that problem.

Instead of teaching isolated snippets, it demonstrates **real implementation patterns**, explains **why** they exist, and shows **how** they're used in production.

---

# Goals

This repository has two primary goals.

## 1. Learn NestJS Deeply

The repository is built as a personal learning journey covering the entire NestJS ecosystem, including:

* REST APIs
* GraphQL
* Authentication
* Authorization
* Guards
* Pipes
* Interceptors
* Exception Filters
* Middleware
* Dependency Injection
* Configuration
* Validation
* PostgreSQL
* Prisma
* TypeORM (where appropriate)
* Swagger / OpenAPI
* WebSockets
* File Uploads
* Events
* Queues
* Caching
* Scheduling (Cron Jobs)
* Unit Testing
* End-to-End Testing
* Docker
* CI/CD
* Production Architecture

Every feature is explored with practical examples rather than isolated code snippets.

---

## 2. Become a Community Reference

The long-term goal is to make this repository a place developers can visit whenever they ask:

> "How do I implement this in NestJS?"

Instead of searching through dozens of blog posts or incomplete examples, developers should be able to find a complete implementation with explanations and best practices.

This project is intended to become a practical companion to the official NestJS documentation—not a replacement for it.

---

# Philosophy

This repository follows a few simple principles.

### Learn by Building

Every concept is implemented in code.

If something can be demonstrated with an API endpoint, a GraphQL resolver, a test, or a production example, it should be.

---

### Explain the "Why"

Code without context isn't enough.

Each topic should answer:

* What problem does this solve?
* Why does NestJS provide this feature?
* When should I use it?
* When should I avoid it?
* How is it used in production?
* What are the common mistakes?

---

### Production-Oriented

Examples should resemble code you'd actually want to deploy.

That means:

* Clean architecture
* Feature-based modules
* Dependency Injection
* SOLID principles where appropriate
* Consistent project structure
* Testing
* Documentation
* Maintainability

---

### Keep It Practical

This repository intentionally avoids unnecessary complexity.

The goal is not to showcase every design pattern ever invented.

The goal is to teach developers how to build reliable NestJS applications.

---

# Repository Structure

```text
nestjs-by-example/

├── docs/                  # Architecture and concept documentation (planned)
├── docker/                # Docker configuration (planned)
├── scripts/               # Utility scripts (planned)
├── src/
│   └── examples/          # Core learning modules — each folder is a chapter
│       │
│       ├── basics/
│       ├── modules/
│       ├── dependency-injection/
│       ├── config/
│       ├── validation/
│       ├── pipes/
│       ├── guards/
│       ├── interceptors/
│       ├── filters/
│       ├── middleware/
│       ├── authentication/
│       ├── authorization/
│       ├── database/
│       ├── upload/
│       ├── cache/
│       ├── events/
│       ├── cron/
│       ├── queues/
│       ├── websocket/
│       ├── graphql/
│       ├── testing/
│       └── openapi/
│
├── test/
├── README.md
└── ROADMAP.md             # Recommended learning order and how to use each chapter
```

Every feature is organized into its own module so it can be explored independently while still being part of a complete NestJS application.

Each chapter lives under `src/examples/<chapter>/` and includes a `README.md` with theory, walkthrough, and exercises. See **[ROADMAP.md](./ROADMAP.md)** for the recommended learning order and step-by-step workflow.

---

# Learning Roadmap

> For the full learning guide — prerequisites, chapter order, and how to work through each module — see **[ROADMAP.md](./ROADMAP.md)**.

The repository will gradually evolve through several phases.

## Phase 1

* Project Setup
* Controllers
* Providers
* Modules
* Dependency Injection
* Configuration
* Validation

---

## Phase 2

* Middleware
* Pipes
* Guards
* Interceptors
* Exception Filters

---

## Phase 3

* PostgreSQL
* Prisma
* Database Design
* Transactions
* Pagination

---

## Phase 4

* JWT Authentication
* Refresh Tokens
* Authorization
* RBAC
* OAuth

---

## Phase 5

* GraphQL
* WebSockets
* Events
* Queues
* Caching
* Scheduling

---

## Phase 6

* Unit Testing
* End-to-End Testing
* Docker
* CI/CD
* Deployment
* Production Architecture

---

# Who Is This For?

This repository is intended for:

* Developers learning NestJS
* Full-stack developers transitioning from Express
* Backend developers looking for production patterns
* Students learning modern backend development
* Developers preparing for technical interviews
* Teams adopting NestJS

---

# Contributing

Contributions are always welcome.

If you find:

* Bugs
* Better patterns
* Missing topics
* Outdated examples
* Documentation improvements

feel free to open an issue or submit a pull request.

The objective is to build one of the most useful NestJS educational repositories available.

---

# Maintainer

Created and maintained by **Monte Sina**.

I'm a product-oriented full-stack developer focused on building scalable web applications with modern JavaScript and TypeScript technologies.

This repository documents my journey into mastering NestJS while creating a resource that helps other developers learn faster.

---

# Acknowledgements

A huge thanks to the NestJS team for creating an outstanding framework and maintaining excellent official documentation.

This repository builds upon those foundations by focusing on practical implementation patterns and real-world examples.

---

# License

This project is released under the MIT License.

Feel free to use the code, learn from it, and contribute back to help the community.

---

## ⭐ If this repository helps you...

Please consider giving it a star.

It helps more developers discover the project and motivates future improvements.

Happy coding! 🚀
