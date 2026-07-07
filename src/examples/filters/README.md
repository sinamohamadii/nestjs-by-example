# Filters

## What problem does this solve

Without a filter, when your app throws an error, NestJS sends back its own default error response. Sometimes that response looks different depending on where the error came from. One route might return a clean message, another might return something confusing, and a truly unexpected error might leak details you never meant to show the user.

A filter fixes this. It catches every error before it reaches the user and lets you decide exactly what gets sent back. Same shape, every time, no matter what broke or where.

## Why NestJS provides this feature

Every real application has errors. A missing record, bad input from a user, a server problem, or something totally unexpected that nobody planned for. NestJS cannot guess how you want each of these to look to your users, so it gives you a way to catch them yourself and format them the way your application needs.

## When to use it

Use a filter any time you want consistent, predictable error responses across your app. This becomes important the moment your app is used by real people or by another service calling your API, since both need to depend on the shape of the response, not just the status code.

## How it works

This chapter has four routes that each throw a different kind of error on purpose.

One throws a not found error, one throws a bad request error, one throws a server error, and one throws a plain, unexpected error that NestJS does not recognize on its own.

The filter is attached to the controller using @UseFilters. This means every route in that controller is protected by the same filter.

Inside the filter, we check whether the error is one NestJS already understands. If it is, we take its real status code and its real message. If it is not, meaning it is a surprise error we did not plan for, we fall back to a generic message and a 500 status, so the user never sees a raw, confusing error.

Either way, the final response always looks the same. Status code, message, the path that caused it, and the time it happened.

## Common mistakes

A common mistake is only handling the errors you expect and forgetting about the ones you do not. This chapter uses @Catch() with nothing inside it on purpose, so it catches everything, expected and unexpected.

Another common mistake is applying a filter only to one controller and assuming the whole app is protected. A filter only protects what it is attached to. If you want to protect the entire application at once, you attach the filter globally in main.ts instead of on a single controller. We kept it on the controller here to make it easier to see which filter protects which routes, but it is worth knowing that the global option exists.

## Related concepts

This chapter connects closely to Validation, which is already covered earlier in this repository. Validation is what rejects bad input from a user in the first place. Filters is what decides how that rejection, along with every other kind of error, gets shown back to the user.