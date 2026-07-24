# Game Accounts

## Overview

A simple and secure way to handle player accounts for the game is to use a backend authentication flow based on Node.js, Express.js, Prisma ORM, bcrypt, and JSON Web Tokens (JWT).

This approach would allow players to:

- create an account
- log in securely
- stay authenticated across requests
- access protected game features after login

## Recommended Stack

The following tools are a strong fit for this project:

- Node.js and Express.js for building the API routes
- Prisma ORM for managing database models and queries
- bcrypt for securely hashing passwords
- JWT for stateless authentication
- TypeScript for safer and more maintainable server code

## 1. Node.js and Express.js

Node.js is the runtime environment that executes JavaScript on the server.

Express.js is a lightweight web framework built on top of Node.js. It listens for incoming HTTP requests and routes them to the appropriate handlers.

For this game, we could create endpoints such as:

- POST /register for account creation
- POST /login for authentication

Example idea:

```ts
app.post('/register', async (req, res) => {
  // receive username and password
  // hash password
  // save user to the database
});
```

## 2. Prisma ORM

Prisma is an ORM that helps connect the application to a database without writing raw SQL manually.

Instead of writing complex SQL queries by hand, Prisma lets us define models in a schema file and then interact with the database using JavaScript or TypeScript.

This makes it easier to:

- define users and game-related data
- create and retrieve records safely
- keep the backend code cleaner and more structured

Example approach:

```ts
await prisma.user.create({
  data: {
    username,
    passwordHash
  }
});
```

## 3. Password Security with bcrypt

Passwords should never be stored in plain text.

bcrypt is used to hash passwords before storing them in the database. This makes accounts much more secure in case the database is ever exposed.

The flow would be:

1. A player submits a password during sign-up.
2. The server runs the password through bcrypt.
3. The hash is stored instead of the raw password.
4. During login, bcrypt compares the entered password with the stored hash.

Example:

```ts
const hashedPassword = await bcrypt.hash(password, 10);
```

## 4. Authentication with JWT

JSON Web Tokens are used to keep a user logged in without requiring them to log in again on every request.

When a player logs in successfully, the server can create a JWT containing information such as the user ID. That token is then sent back to the client and stored locally, usually in browser storage or memory.

On future requests, the client sends the token so the server can verify that the player is authenticated.

Example:

```ts
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '2h' }
);
```

## 5. Database Options

There are a few database options that could work well with Prisma.

### Recommended option: Neon

Neon is a serverless PostgreSQL platform with a free tier.

Benefits:

- free tier available
- good for relational data
- works well with Prisma
- scales well for a game backend

It is a strong fit for features such as:

- player accounts
- leaderboards
- match history
- game statistics

### Other possible option: Supabase

Supabase is another strong alternative, especially if a team wants a managed backend with additional features.

At this stage, Neon is a good starting point because the project likely needs relational database support and a simple PostgreSQL setup.

## Sign-Up Flow

1. The player submits their username and password to the /register endpoint.
2. Express receives the request.
3. The password is hashed using bcrypt.
4. Prisma stores the username and hashed password in the database.
5. The account is created successfully.

## Login Flow

1. The player submits their login credentials to the /login endpoint.
2. Express passes the request to Prisma to find the matching user.
3. bcrypt compares the entered password with the stored hash.
4. If the password is correct, the server generates a JWT.
5. The token is returned to the player so they can access protected game features.

## Summary

A solid backend authentication design for this game would be:

- Express.js for API endpoints
- Prisma ORM for database access
- bcrypt for password hashing
- JWT for authentication
- Neon or Supabase as the database backend

This combination provides a practical and secure foundation for creating and managing game accounts.
