# Testing

> Learn how to test NestJS applications with Jest. This chapter covers unit tests for a service in isolation and end-to-end (e2e) tests that drive real HTTP routes with Supertest—through a small, easy-to-follow example.

---

# What you'll learn

By the end of this chapter, you will understand:

* Why automated tests matter
* The difference between unit tests and e2e tests
* How to build a `TestingModule` with `@nestjs/testing`
* How to test a service in isolation
* How to test HTTP routes with Supertest
* Testing best practices

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

As an app grows, it becomes easy to break something without noticing.

Automated tests run your code and check that it still behaves correctly, so you can change things with confidence.

NestJS is built with testing in mind: its dependency injection lets you swap real dependencies for fakes, and `@nestjs/testing` makes it easy to spin up just the piece you want to test.

---

# Theory

There are two common kinds of tests:

* **Unit test** – tests one class (like a service) in isolation. Fast, and focused on logic and edge cases.
* **End-to-end (e2e) test** – starts a real Nest application and sends real HTTP requests, checking the whole route from request to response.

Both start the same way: `Test.createTestingModule({...}).compile()` builds a mini application containing only what you list.

* For a unit test, you `module.get(Service)` and call its methods.
* For an e2e test, you `module.createNestApplication()`, then use **Supertest** to send HTTP requests to it.

---

# How Nest handles this internally

```text
Test.createTestingModule({ providers, controllers })
        │
        ▼
        ├── Unit test  → module.get(Service) → call methods directly
        │
        └── e2e test   → module.createNestApplication()
                              │
                              ▼
                         supertest(app.getHttpServer()).get(...)
```

---

# Scenario

We'll test a tiny `MathService` (add and divide) and one route that uses it.

* A **unit test** checks `add`, `divide`, and the divide-by-zero edge case.
* An **e2e test** sends real requests to `GET /testing/add` and checks the responses.

---

# Folder structure

```text
testing/

├── README.md
├── requests.http
├── testing.module.ts
├── testing.controller.ts
├── math.service.ts
│
├── math.service.spec.ts     # unit test
└── testing.e2e.spec.ts      # end-to-end test
```

---

# Walkthrough

### Step 1

Write `math.service.spec.ts`.

Build a `TestingModule` with only `MathService`, get the service, and assert on its methods—including the divide-by-zero case.

---

### Step 2

Write `testing.e2e.spec.ts`.

Build a `TestingModule` with the controller and service, create a real app with `createNestApplication()`, and use Supertest to check the HTTP responses.

---

### Step 3

Run the tests:

```bash
pnpm test                # run all tests
pnpm test math.service   # run just the unit test
```

---

# Example

Unit test:

```ts
expect(service.add(2, 3)).toBe(5);
expect(() => service.divide(1, 0)).toThrow(BadRequestException);
```

e2e test:

```ts
return request(app.getHttpServer())
  .get('/testing/add?a=2&b=3')
  .expect(200)
  .expect({ result: 5 });
```

Both pass when the code behaves correctly.

---

# Try it yourself

### Exercise 1

Add a `subtract` method and a test for it.

---

### Exercise 2

Replace `MathService` with a fake in the controller test using a custom provider.

---

### Exercise 3

Add an e2e test for the `400` case when the input isn't a number.

---

### Exercise 4

Use `jest.spyOn` to check that a method was called.

---

### Exercise 5

Measure coverage with `pnpm test:cov`.

---

# Common mistakes

* Testing implementation details instead of behavior.
* Forgetting to `await app.close()` in e2e tests, leaking open handles.
* Writing only happy-path tests and skipping edge cases.
* Making unit tests depend on a real database or network.
* Overusing e2e tests where a fast unit test would do.

---

# Best practices

* Write many small unit tests and fewer, broader e2e tests.
* Always cover edge cases and error paths.
* Keep tests independent—no shared mutable state between them.
* Use fakes/mocks to isolate the unit under test.
* Run tests in CI so regressions are caught automatically.

---

# Related chapters

After completing this chapter, continue with:

* Database (testing with a test database)
* Authentication (testing protected routes)

---

# Summary

NestJS makes testing straightforward: `@nestjs/testing` builds a module with exactly the pieces you need.

Unit tests check a class in isolation, while e2e tests drive real HTTP routes with Supertest.

By understanding both, you'll be able to change your code with confidence, knowing your tests will catch mistakes.
