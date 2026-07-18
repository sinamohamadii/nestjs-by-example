# WebSockets

> Learn how to build real-time features in NestJS with WebSocket Gateways. This chapter covers what WebSockets are, receiving events with `@SubscribeMessage`, and broadcasting to all clients through a simple chat example.

---

# What you'll learn

By the end of this chapter, you will understand:

* What WebSockets are and how they differ from HTTP
* What a Gateway is
* How to receive events with `@SubscribeMessage`
* How to broadcast to all connected clients
* How to react to connections
* WebSocket best practices

---

# Prerequisites

Before starting this chapter, you should already understand:

* Modules
* Dependency Injection
* Providers (Services)

It is recommended to complete the previous chapters before continuing.

---

# Why this exists

Regular HTTP is one-way: the client asks, the server answers, and the connection closes. The server can't push new data on its own.

For features like chat, live notifications, dashboards, or multiplayer games, the server needs to send data to clients *as things happen*.

**WebSockets** keep a connection open in both directions, so the server and client can send messages to each other at any time.

---

# Theory

In NestJS, real-time logic lives in a **Gateway**—the WebSocket equivalent of a Controller.

Key decorators:

* `@WebSocketGateway()` – marks a class as a gateway.
* `@SubscribeMessage('event')` – handles an incoming event (like a route handler).
* `@MessageBody()` – reads the data a client sent.
* `@WebSocketServer()` – gives you the underlying server so you can broadcast.

The server can send to everyone with `server.emit('event', data)`.

This example uses **socket.io**, the default WebSocket implementation for NestJS.

---

# How Nest handles this internally

```text
Client connects (ws://localhost:3000)
        │
        ▼
handleConnection() runs
        │
Client emits "message"
        │
        ▼
@SubscribeMessage('message') handler runs
        │
        ▼
server.emit('message', text)  → sent to ALL connected clients
```

---

# Scenario

We'll build a tiny chat.

When any client sends a `message` event, the server broadcasts it to every connected client.

Open the demo page in two browser tabs and watch a message appear in both.

---

# Folder structure

```text
websocket/

├── README.md
├── requests.http      # how to run the demo (WebSockets aren't plain HTTP)
├── client.html        # a small browser client to try it
├── websocket.module.ts
└── chat.gateway.ts
```

---

# Walkthrough

### Step 1

Create `ChatGateway` with `@WebSocketGateway({ cors: true })`.

---

### Step 2

Implement `handleConnection` to log when a client connects.

---

### Step 3

Add a `@SubscribeMessage('message')` handler that receives text and broadcasts it with `server.emit('message', text)`.

---

### Step 4

Register the gateway as a provider in the module.

---

# Example

How to try it:

1. Start the app: `pnpm start:dev`
2. Open `client.html` in **two** browser tabs.
3. Type a message in one tab and send it.
4. It instantly appears in **both** tabs.

Client code (simplified):

```js
const socket = io('http://localhost:3000');
socket.on('message', (text) => console.log('got', text));
socket.emit('message', 'hello world');
```

---

# Try it yourself

### Exercise 1

Send the sender's socket id along with each message.

---

### Exercise 2

Add a `handleDisconnect` and log when clients leave.

---

### Exercise 3

Return a value from the handler and read it as an acknowledgement on the client.

---

### Exercise 4

Broadcast to everyone *except* the sender using `client.broadcast.emit`.

---

### Exercise 5

Add "rooms" so messages only go to clients in the same room.

---

# Common mistakes

* Forgetting to register the gateway as a provider, so it never starts.
* Mismatched event names between client and server.
* Trying to test WebSockets with plain HTTP tools.
* Sending large or very frequent messages without throttling.
* Not enabling CORS when connecting from a browser page.

---

# Best practices

* Keep gateway handlers thin—put logic in services.
* Validate incoming messages just like HTTP input.
* Use rooms/namespaces to target the right clients.
* Handle connect and disconnect to track active users.
* Secure gateways with guards when messages are sensitive.

---

# Related chapters

After completing this chapter, continue with:

* Events (in-app event handling)
* Authentication (securing gateways)

---

# Summary

WebSockets give your app a persistent, two-way connection so the server can push data in real time.

In NestJS, a Gateway handles incoming events with `@SubscribeMessage` and broadcasts with `server.emit`.

By understanding gateways, you'll be able to build chat, notifications, and other live features cleanly.
