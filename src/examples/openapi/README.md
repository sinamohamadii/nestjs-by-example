# OpenAPI (Swagger)

> Learn how to generate interactive API documentation in NestJS with `@nestjs/swagger`. This chapter covers setting up Swagger, describing endpoints and DTOs with decorators, and exploring your API through the Swagger UI.

---

# What you'll learn

By the end of this chapter, you will understand:

* What OpenAPI and Swagger are
* How to set up Swagger in a NestJS app
* How to document endpoints with `@ApiTags` and `@ApiOperation`
* How to document DTO fields with `@ApiProperty`
* How to explore your API in the Swagger UI
* Documentation best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* DTOs and Validation

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

An API is only useful if people know how to call it.

Writing documentation by hand is tedious and quickly goes out of date.

**OpenAPI** is a standard for describing REST APIs, and **Swagger UI** turns that description into an interactive web page where anyone can read about—and even try—your endpoints.

`@nestjs/swagger` generates this documentation automatically from your controllers, DTOs, and a few decorators, so it always matches your real code.

---

# Theory

There are two pieces:

* **Setup** – in `main.ts` you build a document with `DocumentBuilder`, then serve it with `SwaggerModule.setup('docs', ...)`. This creates the UI at `/docs` and the raw JSON at `/docs-json`.
* **Decorators** – you enrich the generated docs with:
  * `@ApiTags('products')` – group related routes.
  * `@ApiOperation({ summary })` – describe an endpoint.
  * `@ApiResponse({ status, description })` – describe a response.
  * `@ApiProperty({ example, description })` – describe a DTO field.

NestJS already knows your routes and types, so these decorators just add the human-friendly details.

---

# How Nest handles this internally

```text
Application starts
        │
        ▼
DocumentBuilder → describe the API (title, version, ...)
        │
        ▼
SwaggerModule.createDocument(app, config)
        │  scans controllers + DTOs + @Api* decorators
        ▼
SwaggerModule.setup('docs', app, document)
        │
        ▼
UI served at /docs   ·   JSON served at /docs-json
```

---

# Scenario

We'll document a small products API with two routes: list products and create a product.

The `CreateProductDto` is annotated so its fields, types, and examples appear in the docs.

The Swagger setup itself lives in `main.ts` because it applies to the whole application.

---

# Folder structure

```text
openapi/

├── README.md
├── requests.http
├── openapi.module.ts
├── openapi.controller.ts
└── dto/
    └── create-product.dto.ts
```

The Swagger setup is added in `src/main.ts`.

---

# Walkthrough

### Step 1

In `main.ts`, build the document with `DocumentBuilder` and serve it with `SwaggerModule.setup('docs', ...)`.

---

### Step 2

Add `@ApiTags('products')` to the controller to group its routes.

---

### Step 3

Add `@ApiOperation` and `@ApiResponse` to describe each endpoint.

---

### Step 4

Add `@ApiProperty` to each field of `CreateProductDto` with an example and description.

---

# Example

Start the app and open:

```text
http://localhost:3000/docs
```

You'll see an interactive page listing the **products** routes. Expand "Create a product" to see the request body, the field descriptions, and a "Try it out" button.

The raw document is available as JSON:

```http
GET /docs-json
```

---

# Try it yourself

### Exercise 1

Add a description and example to a new DTO field.

---

### Exercise 2

Document a `404` response on a "get one" endpoint with `@ApiResponse`.

---

### Exercise 3

Add `@ApiTags` to another controller and see it grouped separately.

---

### Exercise 4

Add authentication docs with `@ApiBearerAuth` and `addBearerAuth()`.

---

### Exercise 5

Change the API title and version in `DocumentBuilder`.

---

# Common mistakes

* Forgetting to call `SwaggerModule.setup`, so `/docs` is empty.
* Expecting `@ApiProperty` to appear without adding it (Swagger can't guess descriptions).
* Documenting responses that don't match the real behavior.
* Exposing the docs publicly in production without thinking about security.
* Letting examples drift from what the API actually accepts.

---

# Best practices

* Add `@ApiProperty` to every DTO field with a helpful example.
* Give each endpoint a clear `@ApiOperation` summary.
* Keep the API title and version up to date.
* Group routes with `@ApiTags` for readability.
* Consider protecting or disabling the docs in production.

---

# Related chapters

After completing this chapter, continue with:

* Validation (the DTOs Swagger documents)
* Authentication (documenting protected routes)

---

# Summary

`@nestjs/swagger` generates interactive OpenAPI documentation straight from your code.

You set it up once in `main.ts`, then enrich it with `@Api*` decorators so the docs stay accurate and helpful.

By understanding this, you'll be able to give your API clear, always-current documentation with very little effort.
