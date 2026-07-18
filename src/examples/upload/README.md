# File Uploads

> Learn how to handle file uploads in NestJS using `FileInterceptor`. This chapter covers receiving multipart/form-data, reading the uploaded file, and validating its size and type through a simple upload example.

---

# What you'll learn

By the end of this chapter, you will understand:

* How NestJS handles file uploads
* What `multipart/form-data` is
* How to use `FileInterceptor` and `@UploadedFile()`
* How to read an uploaded file's details
* How to validate file size and type with `ParseFilePipe`
* File upload best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Controllers
* Modules
* Interceptors
* Pipes

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Regular JSON requests can't carry files.

To send a file, browsers use a special format called `multipart/form-data`, where each field (including the file) is sent as a separate part.

NestJS uses **Multer** (built into `@nestjs/platform-express`) to parse these requests, so you don't have to handle the raw stream yourself.

`FileInterceptor` extracts the file, and `@UploadedFile()` hands it to your controller as a ready-to-use object.

---

# Theory

To accept a file, a route needs two things:

* `@UseInterceptors(FileInterceptor('file'))` – tells Nest to parse a file from the form field named `file`.
* `@UploadedFile() file: Express.Multer.File` – gives you the parsed file.

The file object contains useful details:

* `originalname` – the file's name on the client
* `mimetype` – the file's type, e.g. `image/png`
* `size` – the size in bytes
* `buffer` – the file's contents in memory

By default the file is kept in memory. In production you'd usually stream it to disk or cloud storage.

---

# How Nest handles this internally

```text
POST /upload  (multipart/form-data)
        │
        ▼
FileInterceptor('file')  → Multer parses the "file" field
        │
        ▼
@UploadedFile()          → controller receives the file object
        │
        ▼
(optional) ParseFilePipe → validate size / type
        │
        ▼
Controller responds
```

---

# Scenario

We'll build a small upload API with two routes.

The application does not save files anywhere—it simply reports the details of what was uploaded.

The goal is to see how a file arrives and how to validate it.

---

# Folder structure

```text
upload/

├── README.md
├── requests.http
├── upload.module.ts
└── upload.controller.ts
```

---

# Walkthrough

### Step 1

Create a `POST /upload` route that accepts any file and returns its name, type, and size.

---

### Step 2

Create a `POST /upload/image` route that only accepts images up to 1 MB.

Use `ParseFilePipe` with a `MaxFileSizeValidator` and a `FileTypeValidator`.

Invalid files are rejected with a `400 Bad Request` before the controller runs.

---

# Example

Request:

```http
POST /upload
Content-Type: multipart/form-data
(field "file" = photo.png)
```

Response:

```json
{
  "originalName": "photo.png",
  "mimeType": "image/png",
  "sizeInBytes": 20481
}
```

Sending a non-image to `/upload/image` returns `400 Bad Request`.

---

# Try it yourself

### Exercise 1

Accept multiple files at once with `FilesInterceptor` and `@UploadedFiles()`.

---

### Exercise 2

Save the uploaded file to a local `uploads/` folder using Multer's disk storage.

---

### Exercise 3

Lower the size limit and watch a large file get rejected.

---

### Exercise 4

Allow only PDF files by changing the `FileTypeValidator`.

---

### Exercise 5

Return a download URL instead of the raw file details.

---

# Common mistakes

* Forgetting `FileInterceptor`, so `@UploadedFile()` is always undefined.
* Using a form field name that doesn't match the one in `FileInterceptor('...')`.
* Trusting `mimetype` alone for security (it can be spoofed).
* Keeping large files in memory instead of streaming them to storage.
* Not setting a size limit, allowing huge uploads.

---

# Best practices

* Always validate file size and type.
* Store files outside your application (disk, S3, etc.) in production.
* Generate safe, unique filenames instead of trusting the client's name.
* Keep upload limits explicit.
* Scan or restrict file types when accepting untrusted uploads.

---

# Related chapters

After completing this chapter, continue with:

* Database (storing file metadata)
* Cache (serving processed files)

---

# Summary

File uploads in NestJS are handled by `FileInterceptor`, which uses Multer to parse `multipart/form-data`.

`@UploadedFile()` gives you the file, and `ParseFilePipe` validates it before your controller runs.

By understanding this flow, you'll be able to accept files safely while keeping your controllers clean.
