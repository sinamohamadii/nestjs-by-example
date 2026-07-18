# Queues

> Learn how to run slow or heavy work in the background with `@nestjs/bullmq`. This chapter covers producers, consumers (processors), and why queues make your API faster and more resilient—through a simple background-email example.

> ⚠️ This chapter needs a running **Redis** server. The quickest way:
> `docker run -d -p 6379:6379 redis`

---

# What you'll learn

By the end of this chapter, you will understand:

* What a queue is and why it helps
* The difference between a producer and a consumer
* How to add a job with `@InjectQueue`
* How to process a job with a `@Processor`
* Why queued work survives restarts
* Queue best practices

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

Some work is slow: sending emails, resizing images, generating reports, calling external services.

If you do it *during* the HTTP request, the user waits—and if it fails, the whole request fails.

A **queue** lets you hand that work off to run in the background. The request returns immediately, and a separate worker processes the job when it can. Because jobs live in Redis, they aren't lost if the app restarts.

---

# Theory

A queue has two sides:

* **Producer** – adds jobs to the queue. You inject the queue with `@InjectQueue('name')` and call `queue.add(...)`.
* **Consumer (Processor)** – takes jobs off the queue and runs them. A class with `@Processor('name')` that extends `WorkerHost` and implements `process(job)`.

The jobs themselves are stored in **Redis**, which is why a Redis server is required.

`@nestjs/bullmq` wires all of this into NestJS with familiar decorators.

---

# How Nest handles this internally

```text
POST /queues/email
        │
        ▼
Producer: queue.add('send', { email })   → job stored in Redis
        │
        ▼
response returns immediately  (user does not wait)


Meanwhile, in the background:
        │
        ▼
Processor.process(job)  → does the slow work → marks the job done
```

---

# Scenario

We'll queue a "welcome email" as a background job.

The `POST /queues/email` route adds a job and returns right away.

A processor picks the job up and "sends" the email a couple of seconds later (it logs the steps).

---

# Folder structure

```text
queues/

├── README.md
├── requests.http
├── queues.module.ts
├── queues.controller.ts
└── email.processor.ts
```

---

# Walkthrough

### Step 1

Start Redis (`docker run -d -p 6379:6379 redis`).

---

### Step 2

Configure BullMQ in the module with `BullModule.forRoot(...)` and register the queue with `BullModule.registerQueue({ name: 'email' })`.

---

### Step 3

In the controller (the producer), inject the queue with `@InjectQueue('email')` and add a job.

---

### Step 4

Create `EmailProcessor` (the consumer) with `@Processor('email')` and a `process(job)` method that does the slow work.

---

# Example

Request:

```http
POST /queues/email
{ "email": "jane@example.com" }
```

Response (immediate):

```json
{ "message": "Email queued.", "jobId": "1" }
```

Server log (a moment later, from the background worker):

```text
[EmailProcessor] Processing job #1 — sending email to jane@example.com
[EmailProcessor] Job #1 done — email sent to jane@example.com
```

The request returned instantly; the work happened afterward.

---

# Try it yourself

### Exercise 1

Add a `delay` option so the job runs 5 seconds later.

---

### Exercise 2

Make the processor fail sometimes and configure automatic retries with `attempts`.

---

### Exercise 3

Log job progress with `job.updateProgress(...)`.

---

### Exercise 4

Add a second queue for a different kind of job.

---

### Exercise 5

Use lifecycle events (like `completed`/`failed`) to react to job results.

---

# Common mistakes

* Forgetting to start Redis, so jobs are never processed.
* Doing the slow work in the request instead of the processor.
* Not registering the processor as a provider, so no worker runs.
* Assuming jobs run instantly—they run when a worker is free.
* Not handling failures or retries for jobs that can fail.

---

# Best practices

* Move any slow or unreliable work into a queue.
* Keep job data small (store an id, not a whole object).
* Configure retries and backoff for jobs that can fail.
* Make processors idempotent so a retried job is safe.
* Monitor queue length and failures in production.

---

# Related chapters

After completing this chapter, continue with:

* Events (in-process reactions)
* Cron (scheduled work)
* Cache (also backed by Redis)

---

# Summary

Queues let your app hand slow work to background workers instead of making users wait.

With `@nestjs/bullmq`, a producer adds jobs and a processor runs them, using Redis to store the jobs safely.

By understanding queues, you'll be able to keep your API fast and resilient—even when the underlying work is slow or unreliable.
