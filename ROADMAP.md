# NestJS by Example Roadmap

Welcome to **NestJS by Example**.

> See also: **[README.md](./README.md)** for project goals, philosophy, and repository structure.

This repository is designed to help developers move beyond tutorials by learning NestJS through practical, production-oriented examples.

Unlike traditional courses that focus on building a single application, this project teaches individual concepts in isolation so you can understand *how* each feature works, *why* it exists, and *when* to use it.

---

# Who is this repository for?

This project is intended for developers who:

* Have experience with JavaScript or TypeScript
* Have built backend applications before (Express, Fastify, Laravel, Spring, ASP.NET, Django, etc.)
* Want to learn NestJS in depth
* Prefer learning by reading and experimenting with code

You **do not** need to be an expert in NestJS.

However, this repository assumes you already understand the fundamentals of backend development.

---

# What you should know before starting

Before diving into the examples, you should be familiar with:

* JavaScript (ES6+)
* TypeScript basics
* Node.js fundamentals
* HTTP methods and REST APIs
* JSON
* npm or pnpm
* Basic command-line usage

You don't need prior experience with NestJS itself.

If you've already created a NestJS project, run it locally, and understand what a Module, Controller, and Service are at a high level, you're ready to start.

---

# Is this suitable for complete beginners?

Not quite.

This repository is **not** intended to be your first introduction to backend development or NestJS.

Instead, think of it as a companion reference after you've completed the official NestJS "getting started" guide or another introductory tutorial.

You'll get much more value from these examples if you're already comfortable with the basics and want to answer questions like:

* *How does this feature actually work?*
* *How would I implement this in production?*
* *Why did NestJS design it this way?*

---

# Recommended preparation

Before working through this repository, we recommend:

1. Installing Node.js
2. Installing the Nest CLI
3. Reading the official NestJS "First Steps" documentation
4. Creating and running a basic NestJS application
5. Understanding the purpose of:

   * Modules
   * Controllers
   * Services
   * Dependency Injection (at a high level)

Once you're comfortable with those concepts, return here and start exploring.

---

# Learning philosophy

Each chapter in this repository follows the same structure:

1. **Theory** – Learn the concept and understand why it exists.
2. **Implementation** – Read and explore a practical example.
3. **Walkthrough** – Understand how the code works internally.
4. **Practice** – Complete small exercises to reinforce your understanding.

The goal isn't just to copy code—it's to understand the reasoning behind it.

---

# Recommended learning order

The examples are organized to gradually build on one another.

## Foundation

* [Basics](./src/examples/basics/README.md)
* Modules
* Dependency Injection
* Configuration

## Building APIs

* Validation
* Pipes
* Middleware
* Guards
* Interceptors
* Filters

## Authentication & Authorization

* Authentication
* Authorization

## Data Layer

* Database
* Uploads
* Cache

## Application Features

* Events
* Cron Jobs
* Queues
* WebSockets
* GraphQL

## Quality & Tooling

* Testing
* OpenAPI

Following this order will give you the smoothest learning experience, as each chapter introduces concepts that are used later.

---

# How to use this repository

For each module:

1. Read the module's `README.md`.
2. Review the implementation.
3. Run the application.
4. Execute the requests in `requests.http`.
5. Experiment by modifying the code.
6. Complete the suggested exercises.
7. Move on to the next chapter.

Learning happens by experimenting—not just reading.

---

# Contributing

As this repository grows, new examples, improvements, and corrections are always welcome.

Please read the project's **[CONTRIBUTING.md](./CONTRIBUTING.md)** before opening an issue or submitting a pull request.

---

# Final note

This repository is designed to become a practical reference for developers using NestJS in real-world applications.

The examples prioritize clarity, maintainability, and production-oriented patterns over shortcuts or clever tricks.

Take your time, explore each chapter, and don't hesitate to experiment with the code. The best way to learn NestJS is by building, breaking, and rebuilding it.

Happy coding! 🚀
