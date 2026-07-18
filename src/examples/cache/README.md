# Caching

> Learn how to cache expensive results in NestJS with `@nestjs/cache-manager`. This chapter covers why caching matters, reading and writing the cache, setting a time-to-live (TTL), and serving repeated requests instantly through a simple example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What caching is and why it speeds up an application
* How to set up `CacheModule`
* How to read from and write to the cache
* What a TTL (time-to-live) is
* The difference between an in-memory cache and a shared cache (Redis)
* Caching best practices

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

Some work is expensive: a slow database query, a call to an external API, or a heavy calculation.

If the result rarely changes, repeating that work on every request is wasteful.

Caching stores the result the first time and reuses it for later requests, making them almost instant—until the cached value expires.

---

# Theory

A cache is a key-value store that sits in front of expensive work.

The typical pattern is called **cache-aside**:

1. Look for the value in the cache.
2. If it's there (a "hit"), return it.
3. If it's not (a "miss"), do the expensive work, store the result, then return it.

Each cached value has a **TTL** (time-to-live). When the TTL passes, the value expires and the next request does the work again.

`@nestjs/cache-manager` gives you a `Cache` object with two key methods:

* `cache.get(key)` – read a value (or `undefined`).
* `cache.set(key, value, ttl)` – store a value for `ttl` milliseconds.

---

# How Nest handles this internally

```text
GET /cache/products/1
        │
        ▼
cache.get("product:1")
        │
        ├── hit  → return cached value (fast)
        │
        └── miss → slow lookup
                     │
                     ▼
                cache.set("product:1", value, ttl)
                     │
                     ▼
                return value
```

---

# Scenario

We'll build a small product lookup where reading a product is intentionally slow (a one-second delay).

The first request takes a full second. Any repeat request within the TTL returns instantly from the cache.

The response includes a `source` field so you can see whether it came from the `"database"` or the `"cache"`.

---

# Folder structure

```text
cache/

├── README.md
├── requests.http
├── cache.module.ts
├── cache.controller.ts
└── products.service.ts
```

---

# Walkthrough

### Step 1

Import `CacheModule.register()` in the module.

With no options it uses a simple in-memory store—no Redis needed.

---

### Step 2

Inject the cache into a service using the `CACHE_MANAGER` token.

---

### Step 3

Apply the cache-aside pattern: check the cache first, and only do the slow lookup on a miss.

Store the result with a 10-second TTL.

---

# Example

First request:

```http
GET /cache/products/1
```

```json
{ "source": "database", "product": { "id": 1, "name": "Mechanical Keyboard", "price": 120 } }
```

Second request (within 10 seconds):

```json
{ "source": "cache", "product": { "id": 1, "name": "Mechanical Keyboard", "price": 120 } }
```

The second response is nearly instant.

---

# Try it yourself

### Exercise 1

Lower the TTL to 3 seconds and watch the cache expire.

---

### Exercise 2

Add a route that clears a product from the cache with `cache.del(key)`.

---

### Exercise 3

Cache a list of products under a single key.

---

### Exercise 4

Use the built-in `CacheInterceptor` to cache a route automatically.

---

### Exercise 5

Swap the in-memory store for Redis using a Redis cache store.

---

# Common mistakes

* Caching data that changes often, so users see stale values.
* Forgetting to set a TTL, letting values live forever.
* Using an in-memory cache across multiple servers (each has its own copy).
* Caching per-user data under a shared key.
* Never invalidating the cache after the underlying data changes.

---

# Best practices

* Cache expensive work whose result changes slowly.
* Always set a TTL that matches how fresh the data must be.
* Use Redis for a cache shared across multiple instances.
* Use clear, unique keys (e.g. `product:1`).
* Invalidate or update the cache when the source data changes.

---

# Related chapters

After completing this chapter, continue with:

* Database (the slow source you're caching)
* Queues (offloading heavy work)

---

# Summary

Caching stores the result of expensive work and reuses it for later requests.

With `@nestjs/cache-manager` you read with `get`, write with `set`, and rely on a TTL to keep data fresh.

By understanding the cache-aside pattern, you'll be able to make your application dramatically faster where it matters most.
