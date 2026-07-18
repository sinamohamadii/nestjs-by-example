# Cron & Scheduled Tasks

> Learn how to run code on a schedule in NestJS with `@nestjs/schedule`. This chapter covers the difference between `@Interval` and `@Cron`, cron expressions, and running background jobs through a simple heartbeat example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What scheduled tasks are
* The difference between `@Interval` and `@Cron`
* What a cron expression is
* How to run background jobs in NestJS
* Scheduling best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Modules
* Dependency Injection
* Providers (Services)

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Some work isn't triggered by a request—it needs to happen on a schedule.

Common examples:

* Sending a daily summary email
* Cleaning up expired records every night
* Refreshing cached data every few minutes
* Polling an external service periodically

`@nestjs/schedule` lets you attach a schedule directly to a method, and NestJS runs it for you in the background.

---

# Theory

There are two main ways to schedule a method:

* `@Interval(ms)` – run every fixed number of milliseconds (e.g. every 5000 ms).
* `@Cron(expression)` – run on a cron schedule (e.g. every day at midnight).

A **cron expression** is a compact string that describes *when* to run, such as `0 0 * * *` (midnight every day). NestJS also provides named presets through `CronExpression`, like `CronExpression.EVERY_10_SECONDS`, so you rarely have to write raw cron strings.

To enable scheduling, import `ScheduleModule.forRoot()` once.

---

# How Nest handles this internally

```text
Application starts
        │
        ▼
ScheduleModule.forRoot() registers the scheduler
        │
        ▼
Every 5s  → @Interval method runs
Every 10s → @Cron method runs
        │
        ▼
(these run in the background, no HTTP request needed)
```

---

# Scenario

We'll build a small background task service.

One task runs every 5 seconds (`@Interval`) and increases a heartbeat counter.

Another runs every 10 seconds (`@Cron`) and logs a cleanup message.

A `GET /cron/status` route lets you observe the counter growing on its own.

---

# Folder structure

```text
cron/

├── README.md
├── requests.http
├── cron.module.ts
├── cron.controller.ts
└── tasks.service.ts
```

---

# Walkthrough

### Step 1

Import `ScheduleModule.forRoot()` in the module.

---

### Step 2

Create a `TasksService`.

Add an `@Interval(5000)` method that increases a counter and logs a heartbeat.

---

### Step 3

Add a `@Cron(CronExpression.EVERY_10_SECONDS)` method that logs a cleanup message.

---

### Step 4

Expose a `GET /cron/status` route that returns the heartbeat count so the background work is visible.

---

# Example

Start the app and watch the server console:

```text
[TasksService] Heartbeat #1
[TasksService] Running the every-10-seconds cleanup job
[TasksService] Heartbeat #2
[TasksService] Heartbeat #3
```

Call the status route:

```http
GET /cron/status
```

```json
{ "heartbeats": 3 }
```

Wait a few seconds and call it again—the number will be higher.

---

# Try it yourself

### Exercise 1

Change the interval to run every 2 seconds.

---

### Exercise 2

Use a raw cron expression to run a task every minute.

---

### Exercise 3

Add a `@Timeout` task that runs once, a few seconds after startup.

---

### Exercise 4

Log the current time inside a task.

---

### Exercise 5

Add a route that reports both the heartbeat count and the time of the last run.

---

# Common mistakes

* Forgetting `ScheduleModule.forRoot()`, so no task ever runs.
* Writing an incorrect cron expression and wondering why it never fires.
* Running heavy work too frequently and overloading the app.
* Assuming tasks run on every server instance safely (they run on each one).
* Doing work that must not overlap without guarding against a slow previous run.

---

# Best practices

* Prefer named `CronExpression` presets over raw strings when possible.
* Keep scheduled work idempotent so a repeat run is safe.
* Log task runs so you can confirm they happen.
* For multi-instance deployments, ensure only one instance runs a given job.
* Move heavy scheduled work into a Queue.

---

# Related chapters

After completing this chapter, continue with:

* Queues (durable background jobs)
* Events (reacting to things that happen)

---

# Summary

Scheduled tasks let your app do work on a timer instead of in response to a request.

With `@nestjs/schedule`, `@Interval` handles fixed intervals and `@Cron` handles calendar-style schedules.

By understanding scheduling, you'll be able to automate recurring work cleanly inside your NestJS application.
