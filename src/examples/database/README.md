# Database (TypeORM)

> Learn how to store and read data in NestJS with a real database layer using TypeORM. This chapter covers entities, repositories, and full CRUD operations through a simple Tasks example—backed by an in-memory SQLite database so it runs anywhere.

---

# What you'll learn

By the end of this chapter, you will understand:

* What an ORM is and why it helps
* What an entity is
* What a repository is
* How to perform CRUD (Create, Read, Update, Delete)
* How `synchronize` creates tables from entities
* Database best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Providers (Services)
* Validation

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Real applications need to store data that survives between requests.

Instead of writing raw SQL everywhere, an **ORM** (Object-Relational Mapper) lets you work with plain classes and objects. TypeORM maps your classes to database tables and turns method calls into SQL for you.

This keeps your data code readable, typed, and consistent.

> To keep this example self-contained, we use an in-memory SQLite database (`sqljs`)—no database server to install. Switching to PostgreSQL or MySQL is just a change of connection options.

---

# Theory

Two ideas do most of the work in TypeORM:

* **Entity** – a class marked with `@Entity()` that maps to a table. Each property is a column.
* **Repository** – an object that reads and writes rows for one entity. It provides methods like `find`, `findOne`, `save`, and `remove`.

You inject a repository into your service with `@InjectRepository(Entity)` and use it to perform all database operations.

---

# How Nest handles this internally

```text
Application starts
        │
        ▼
TypeOrmModule.forRoot()   → connect to the database
        │
        ▼
synchronize: true         → create the "task" table from the entity
        │
        ▼
TypeOrmModule.forFeature([Task]) → make the Task repository injectable
        │
        ▼
TasksService uses the repository to run CRUD
```

---

# Scenario

We'll build a small Tasks API with full CRUD.

Each task has an `id`, a `title`, and a `done` flag.

The data lives in an in-memory SQLite database, so it resets each time the app restarts.

---

# Folder structure

```text
database/

├── README.md
├── requests.http
├── database.module.ts
├── tasks.controller.ts
├── tasks.service.ts
│
├── entities/
│   └── task.entity.ts
└── dto/
    └── create-task.dto.ts
```

---

# Walkthrough

### Step 1

Create the `Task` entity with `@Entity`, `@PrimaryGeneratedColumn`, and `@Column`.

---

### Step 2

Connect the database in the module with `TypeOrmModule.forRoot(...)` and register the entity with `TypeOrmModule.forFeature([Task])`.

---

### Step 3

Inject the repository into `TasksService` with `@InjectRepository(Task)`.

---

### Step 4

Implement CRUD: `create`, `findAll`, `findOne`, `markDone`, and `remove`.

---

### Step 5

Expose the operations through REST routes in `TasksController`.

---

# Example

Create a task:

```http
POST /database/tasks
{ "title": "Buy milk" }
```

```json
{ "id": 1, "title": "Buy milk", "done": false }
```

List tasks:

```http
GET /database/tasks
```

```json
[{ "id": 1, "title": "Buy milk", "done": false }]
```

Requesting a task that doesn't exist returns `404 Not Found`.

---

# Try it yourself

### Exercise 1

Add a `createdAt` column using `@CreateDateColumn()`.

---

### Exercise 2

Add an endpoint to update a task's title.

---

### Exercise 3

Return only tasks that are not done.

---

### Exercise 4

Add a second entity (e.g. `User`) and a relation between them.

---

### Exercise 5

Switch the connection to PostgreSQL and run it with Docker.

---

# Common mistakes

* Forgetting `forFeature([Entity])`, so the repository can't be injected.
* Using `synchronize: true` in production (it can drop or alter tables).
* Not handling the "row not found" case, leading to unclear errors.
* Putting SQL/query logic in controllers instead of services.
* Loading huge tables without pagination.

---

# Best practices

* Keep all database access inside services, not controllers.
* Use migrations instead of `synchronize` in production.
* Validate input with DTOs before writing to the database.
* Return clear errors (like `404`) when a row is missing.
* Add indexes and pagination for large tables.

---

# Related chapters

After completing this chapter, continue with:

* Authentication (storing real users)
* Cache (caching expensive queries)
* Upload (storing file metadata)

---

# Summary

TypeORM lets you work with a database using plain classes and repositories instead of raw SQL.

Entities describe your tables, repositories read and write rows, and services keep that logic in one place.

By understanding this layer, you'll be able to persist real data in your NestJS applications while keeping your code clean and typed.
