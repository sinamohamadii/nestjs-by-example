# GraphQL

> Learn how to build a GraphQL API in NestJS using the code-first approach. This chapter covers object types, resolvers, queries, and mutations through a simple Recipes example—where the schema is generated automatically from your TypeScript classes.

---

# What you'll learn

By the end of this chapter, you will understand:

* What GraphQL is and how it differs from REST
* What "code-first" means
* How to define an `@ObjectType`
* How to write a `@Resolver` with queries and mutations
* How to accept arguments with `@Args` and an `@InputType`
* GraphQL best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers and Modules
* Dependency Injection
* Providers (Services)
* DTOs

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

With REST, each endpoint returns a fixed shape. Clients often get too much data (over-fetching) or need several requests to get everything (under-fetching).

**GraphQL** flips this around: the client asks for exactly the fields it needs, in a single request, from a single `/graphql` endpoint.

NestJS supports GraphQL with the same building blocks you already know—modules, providers, and decorators—so it feels familiar.

---

# Theory

This chapter uses the **code-first** approach: you write TypeScript classes and NestJS generates the GraphQL schema for you.

The main pieces are:

* `@ObjectType()` – a type GraphQL can return (like `Recipe`). Each `@Field()` is a queryable field.
* `@InputType()` – the shape of arguments for a mutation (like a DTO).
* `@Resolver()` – the GraphQL equivalent of a controller. It contains:
  * `@Query()` – reads data.
  * `@Mutation()` – changes data.
  * `@Args()` – reads an argument from the request.

---

# How Nest handles this internally

```text
Application starts
        │
        ▼
GraphQLModule.forRoot({ autoSchemaFile: true })
        │  scans @ObjectType / @Resolver classes
        ▼
generates the GraphQL schema in memory
        │
        ▼
serves a single endpoint at /graphql
        │
        ▼
a query/mutation → the matching resolver method → service
```

---

# Scenario

We'll build a small Recipes API.

* `recipes` – a query that lists all recipes.
* `recipe(id)` – a query that returns one recipe.
* `addRecipe(input)` – a mutation that creates a recipe.

Data is kept in memory so the focus stays on GraphQL.

---

# Folder structure

```text
graphql/

├── README.md
├── requests.http
├── graphql.module.ts
├── recipes.resolver.ts
├── recipes.service.ts
├── recipe.model.ts
└── dto/
    └── new-recipe.input.ts
```

---

# Walkthrough

### Step 1

Define the `Recipe` object type with `@ObjectType` and `@Field`.

---

### Step 2

Define `NewRecipeInput` with `@InputType` for the mutation's arguments.

---

### Step 3

Write `RecipesResolver` with two `@Query` methods and one `@Mutation`.

---

### Step 4

Configure `GraphQLModule.forRoot()` with the Apollo driver and `autoSchemaFile: true`, which generates the schema from your classes.

---

# Example

Query:

```graphql
{
  recipes {
    id
    title
  }
}
```

Response:

```json
{ "data": { "recipes": [{ "id": 1, "title": "Pancakes" }] } }
```

Mutation:

```graphql
mutation {
  addRecipe(input: { title: "Omelette", description: "Quick egg dish" }) {
    id
    title
  }
}
```

```json
{ "data": { "addRecipe": { "id": 2, "title": "Omelette" } } }
```

Open `http://localhost:3000/graphql` to explore the schema interactively.

---

# Try it yourself

### Exercise 1

Add an `ingredients: [String]` field to `Recipe`.

---

### Exercise 2

Add a `removeRecipe(id)` mutation.

---

### Exercise 3

Ask for only the `title` field and confirm nothing else is returned.

---

### Exercise 4

Add validation to `NewRecipeInput` and trigger an error.

---

### Exercise 5

Write a resolver for a related type (e.g. an author of a recipe).

---

# Common mistakes

* Forgetting a `@Field()` decorator, so the field never appears in the schema.
* Returning a type that doesn't match the `@ObjectType`.
* Mixing up `@Query` (read) and `@Mutation` (write).
* Expecting REST-style status codes—GraphQL usually returns `200` with an `errors` array.
* Over-fetching in resolvers instead of letting the client choose fields.

---

# Best practices

* Prefer the code-first approach so the schema stays in sync with your code.
* Keep resolvers thin—put logic in services, just like controllers.
* Use `@InputType` classes for mutation arguments.
* Design types around what clients need, not your database tables.
* Validate inputs the same way you would REST DTOs.

---

# Related chapters

After completing this chapter, continue with:

* Database (backing resolvers with real data)
* Authentication (protecting resolvers with guards)

---

# Summary

GraphQL lets clients request exactly the data they need from a single endpoint.

With NestJS's code-first approach, you write object types and resolvers as TypeScript classes, and the schema is generated for you.

By understanding these building blocks, you'll be able to offer a flexible, strongly-typed API alongside—or instead of—REST.
