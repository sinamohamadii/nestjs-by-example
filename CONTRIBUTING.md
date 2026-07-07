# Contributing to NestJS by Example 🤝

First of all, thank you for considering contributing!

The goal of this repository is to become one of the best practical learning resources for NestJS. Every contribution—whether it's code, documentation, bug fixes, or improvements—helps developers around the world learn faster.

---

# Before You Start

Please take a few minutes to:

* Read the project README.
* Browse the existing examples.
* Search existing Issues before opening a new one.
* Keep examples educational and production-oriented.

Remember:

> This repository is designed for learning, not showcasing clever code.

Favor readability over complexity.

---

# Ways You Can Contribute

There are many ways to help.

## Add New Examples

Help expand the learning experience by implementing examples for topics such as:

* Authentication
* Authorization
* GraphQL
* WebSockets
* Prisma
* PostgreSQL
* Docker
* Testing
* CQRS
* Microservices
* Caching
* Scheduling
* Queues
* OpenTelemetry
* Logging
* Monitoring

---

## Improve Documentation

Documentation is just as important as code.

If something can be explained better, we'd love your help.

Examples include:

* Better diagrams
* Simpler explanations
* Additional examples
* Common pitfalls
* Production tips

---

## Fix Bugs

Found something broken?

Open an Issue or submit a Pull Request.

Please include:

* Description
* Expected behavior
* Actual behavior
* Steps to reproduce

---

## Improve Existing Code

Improvements are welcome when they make the code:

* Easier to understand
* More maintainable
* More aligned with NestJS best practices

Avoid adding unnecessary abstraction or complexity.

---

# Project Philosophy

Every contribution should follow these principles.

## Keep It Educational

Ask yourself:

> Would a developer new to NestJS understand this code?

If the answer is "probably not," consider simplifying it.

---

## Explain the Why

Good examples don't just show *what* to do.

They explain *why*.

Whenever possible, update the documentation alongside the code.

---

## Prefer Production Practices

Examples should demonstrate patterns that teams would actually use in production.

Avoid unrealistic shortcuts unless they are clearly marked as such.

---

# Project Structure

When adding a new feature, keep it inside its dedicated module.

Example:

```text
src/examples/authentication/

authentication.module.ts

authentication.controller.ts

authentication.service.ts

README.md
```

Every feature should be self-contained and easy to discover.

---

# Coding Standards

Please follow these guidelines:

* Use TypeScript strict mode.
* Follow NestJS conventions.
* Keep controllers thin.
* Put business logic inside services.
* Use dependency injection.
* Write meaningful names.
* Remove unused code.
* Keep imports organized.
* Prefer composition over unnecessary inheritance.

---

# Documentation Standards

Every new example should include:

* What problem it solves
* Why it exists
* When to use it
* How it works
* Common mistakes
* Related NestJS concepts

Think of every example as a mini tutorial.

---

# Commit Messages

Use conventional commits whenever possible.

Examples:

```text
feat(auth): add refresh token example

docs(guards): improve explanation of execution order

fix(validation): handle nested DTO validation

test(graphql): add e2e tests

refactor(cache): simplify cache service
```

---

# Pull Request Checklist

Before submitting a Pull Request, please verify:

* Code builds successfully.
* Tests pass.
* Documentation has been updated.
* Examples remain easy to understand.
* No unnecessary dependencies were added.
* Formatting and linting pass.

---

# Ideas Are Welcome

Have an idea for a new topic?

Open an Issue.

Some ideas may include:

* New NestJS features
* Architectural patterns
* Real-world integrations
* Performance improvements
* Developer experience enhancements

Even if you don't plan to implement it yourself, we'd love to discuss it.

---

# Development Workflow

1. Fork the repository.
2. Clone your fork.
3. Check out the `dev` branch.
4. Create a feature branch.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature
```

5. Make your changes.
6. Commit using descriptive commit messages.
7. Push your branch.
8. Open a Pull Request targeting the `dev` branch.

Please do **not** open Pull Requests directly against `main`.

---

# Code of Conduct

Please be respectful and constructive.

This project exists to help developers learn.

Be kind, patient, and welcoming to contributors of all experience levels.

---

# Thank You ❤️

Open source grows because people choose to share their knowledge.

Whether you fix a typo, improve a README, or implement an entire feature—you are helping make NestJS more approachable for the next developer.

Thank you for being part of the journey.

Happy coding! 🚀
