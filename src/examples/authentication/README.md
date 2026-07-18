# Authentication

> Learn how to authenticate users in NestJS with JSON Web Tokens (JWT). This chapter covers logging in to receive a token, signing tokens with `@nestjs/jwt`, and protecting routes with a Guard through a simple login example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What authentication is and how it differs from authorization
* What a JWT is and why it's useful
* How to issue a token when a user logs in
* How to sign tokens with `@nestjs/jwt`
* How to protect routes with an authentication Guard
* How to read the logged-in user inside a controller
* Authentication best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Dependency Injection
* Guards
* Validation

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Most applications have routes that only logged-in users should reach.

Authentication answers the question: **"Who is making this request?"**

A common, stateless way to do this is with a JSON Web Token (JWT):

1. The user logs in with a username and password.
2. The server verifies them and returns a signed token.
3. The client sends that token on every future request.
4. A Guard checks the token before the controller runs.

Because the token is signed, the server can trust it without storing a session.

---

# Theory

A JWT is a string with three parts: a header, a payload, and a signature.

The payload holds small pieces of data (called claims) such as the user id.

The signature is created with a secret key. If anyone changes the token, the signature no longer matches and the token is rejected.

In NestJS, `@nestjs/jwt` provides a `JwtService` with two key methods:

* `sign(payload)` – create a token.
* `verify(token)` – check a token and return its payload (or throw if invalid).

---

# How Nest handles this internally

For this chapter, the important part of the lifecycle is:

```text
POST /auth/login
        │
        ▼
AuthService verifies credentials
        │
        ▼
JwtService.sign(payload) → token
        │
        ▼
Client stores the token


GET /auth/profile  (Authorization: Bearer <token>)
        │
        ▼
AuthGuard → JwtService.verify(token)
        │
        ├── valid   → attach user, allow
        └── invalid → 401 Unauthorized
        │
        ▼
Controller
```

---

# Scenario

We'll build a tiny login API.

There is no real database—users live in memory, and passwords are stored as plain text **only** to keep the example readable.

The goal is to see how a token is issued at login and then required by a protected route.

---

# Folder structure

```text
authentication/

├── README.md
├── requests.http
├── authentication.module.ts
├── authentication.controller.ts
│
├── auth.service.ts
├── auth.guard.ts
├── users.service.ts
└── dto/
    └── login.dto.ts
```

---

# Walkthrough

### Step 1

Create a `UsersService` with one in-memory user.

---

### Step 2

Create an `AuthService` that checks the username and password and, if valid, signs a JWT with `JwtService`.

---

### Step 3

Add a `POST /auth/login` route that returns the token.

---

### Step 4

Create an `AuthGuard` that reads the `Authorization: Bearer <token>` header and verifies the token.

Apply it to a protected `GET /auth/profile` route.

---

# Example

Request:

```http
POST /auth/login
{ "username": "john", "password": "password123" }
```

Response:

```json
{ "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..." }
```

Request:

```http
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Response:

```json
{
  "message": "This is protected data.",
  "user": { "sub": 1, "username": "john", "iat": ..., "exp": ... }
}
```

Without a valid token, `/auth/profile` returns `401 Unauthorized`.

---

# Try it yourself

### Exercise 1

Add a second user and log in as them.

---

### Exercise 2

Return the username in the login response alongside the token.

---

### Exercise 3

Shorten the token's expiry and watch a request fail after it expires.

---

### Exercise 4

Move the JWT secret into configuration using `@nestjs/config`.

---

### Exercise 5

Hash passwords with `bcrypt` instead of comparing plain text.

---

# Common mistakes

* Storing passwords as plain text (always hash them in real apps).
* Hard-coding the JWT secret instead of loading it from configuration.
* Putting the secret in the token payload (the payload is readable by anyone).
* Forgetting that a JWT payload is encoded, not encrypted.
* Not handling expired tokens.

---

# Best practices

* Hash passwords with a strong algorithm such as bcrypt or argon2.
* Keep the JWT secret in environment configuration.
* Use short-lived access tokens and add refresh tokens for longer sessions.
* Return the same error for "unknown user" and "wrong password".
* Keep token verification in a Guard, not scattered across controllers.

---

# Related chapters

After completing this chapter, continue with:

* Authorization (roles and permissions)
* Database (storing real users)
* Cache (storing sessions or blacklisted tokens)

---

# Summary

Authentication verifies who is making a request.

With JWTs, the server issues a signed token at login and a Guard verifies it on protected routes—no server-side session required.

By understanding this flow, you'll be able to secure your APIs cleanly while keeping controllers focused on business logic.
