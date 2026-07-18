# Events

> Learn how to decouple your code with events in NestJS using `@nestjs/event-emitter`. This chapter covers emitting events, listening for them with `@OnEvent`, and why event-driven code is easier to extend—through a simple user-registration example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What an event-driven approach is
* Why events help decouple your code
* How to emit an event with `EventEmitter2`
* How to handle an event with `@OnEvent`
* How to pass typed data in an event
* Event best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Providers (Services)

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

When something happens in your app, several unrelated things often need to react.

For example, when a user registers you might want to:

* Send a welcome email
* Create a default profile
* Notify an analytics service

Putting all of that inside the registration code makes it long and tightly coupled. Every new reaction means editing the same method.

Events solve this. The registration code simply announces "a user registered," and any number of listeners react independently—without the registration code knowing about them.

---

# Theory

An event-driven flow has two sides:

* **Emitter** – announces that something happened: `eventEmitter.emit('user.registered', payload)`.
* **Listener** – reacts to it: a method decorated with `@OnEvent('user.registered')`.

The emitter doesn't know who is listening, and listeners don't know who emitted. They only share the event name and its payload.

This keeps each piece small and lets you add new reactions without touching existing code.

---

# How Nest handles this internally

```text
POST /events/register
        │
        ▼
UsersService.register()
        │
        ├── emit "user.registered"
        │        │
        │        ▼
        │   WelcomeEmailListener  (@OnEvent) → send email
        │
        ▼
return response (does not wait on listeners)
```

---

# Scenario

We'll build a tiny registration endpoint.

Registering a user emits a `user.registered` event.

A separate listener reacts by "sending" a welcome email (it logs a message).

The registration code never mentions email—that concern lives entirely in the listener.

---

# Folder structure

```text
events/

├── README.md
├── requests.http
├── events.module.ts
├── events.controller.ts
│
├── users.service.ts
├── welcome-email.listener.ts
└── user-registered.event.ts
```

---

# Walkthrough

### Step 1

Import `EventEmitterModule.forRoot()` in the module.

---

### Step 2

Create a `UserRegisteredEvent` class to describe the event payload.

---

### Step 3

In `UsersService`, emit `user.registered` after creating the user.

---

### Step 4

Create `WelcomeEmailListener` with an `@OnEvent('user.registered')` method that reacts to the event.

Register it as a provider so Nest discovers the handler.

---

# Example

Request:

```http
POST /events/register
{ "email": "jane@example.com" }
```

Response (returns immediately):

```json
{ "message": "User registered.", "user": { "id": 173..., "email": "jane@example.com" } }
```

Server log (from the listener):

```text
[WelcomeEmailListener] Sending welcome email to jane@example.com (user #173...)
```

---

# Try it yourself

### Exercise 1

Add a second listener (e.g. an analytics listener) for the same event.

---

### Exercise 2

Emit a different event, such as `user.deleted`, and handle it.

---

### Exercise 3

Use a wildcard listener like `@OnEvent('user.*')`.

---

### Exercise 4

Make a listener `async` and do slow work without blocking the response.

---

### Exercise 5

Move the event name into a shared constant to avoid typos.

---

# Common mistakes

* Forgetting to register the listener as a provider, so it never runs.
* Misspelling the event name in either the emit or the `@OnEvent`.
* Relying on events for critical work that must not be lost (events are in-memory here).
* Doing heavy synchronous work in a listener and slowing the app.
* Expecting the emitter to receive a return value from listeners.

---

# Best practices

* Use clear, namespaced event names like `user.registered`.
* Keep each listener focused on one reaction.
* Use typed event classes for payloads.
* Prefer events for optional side effects, not core business rules.
* For work that must survive a crash, use a Queue instead.

---

# Related chapters

After completing this chapter, continue with:

* Queues (durable background jobs)
* Cron (scheduled tasks)

---

# Summary

Events let one part of your app announce that something happened while other parts react independently.

With `@nestjs/event-emitter`, you emit with `EventEmitter2` and listen with `@OnEvent`.

By understanding events, you'll be able to keep your core logic clean and add new behavior without changing existing code.
