# Game Accounts

Reference: https://dev.to/owo_frostyy_df9242c6be6f5/user-authentication-and-authorization-in-nodejs-expressjs-app-using-typescript-prisma-zod-and-jwt-5b8d

This dev uses this stack:

- Node.js and Express.js to build the API routes.
- Prisma ORM to manage the database models and queries.
- Bcrypt for securely hashing passwords before storing them.
- JWT (JSON Web Tokens) for generating secure tokens to authorise users after they log in.
- They also use Typescript which is basically JavaScript but it’s good to highlight.

## Node.js and Express.js:

The sign up route.

https://expressjs.com

Node.js is the environment that runs your JavaScript code on the server instead of in a browser.

Express.js is a framework built on top of Node.js that listens for incoming HTTP requests from the players.

We could use Express.js to create routes/endpoints. For example, when a player registers in our game, their browser will send their chosen username and password directly to this express route by coding an app.post(‘/register’) route.

## Prisma ORM (Object-Relational Mapping):

The database translator.

https://www.prisma.io/docs

Databases normally use SQL, but if we use this when we write JavaScript, Prisma acts as the translator between the two. It allows us to interact with databases using the language of the application instead of SQL queries.

How we can use it - we define data in a model in a schema.prisma file. Then, Prisma generates a type-safe client that lets you write JavaScript code to interact with the database. To create a new user we would code - prisma.user.create({ data: { username, password } }).

## The actual database?:

There are a few options we can use alongside Prisma.

- NEON - free to use tier - 500mb of storage and 100 hours of active time a month. It is server less, so it’s not used when not in use. And it wakes up fast. - https://neon.com/docs/prisma - It is a  relational database, this means it will come in handy for scoreboards ect.
- Supabase?

But open to other options.

## Bcrypt:

This is the security layer for our database. It is a cryptographic library used to securely hash passwords.

When a user registers we need to run their password through bcrypt.hash(). This turns the passwords into a hash. We then need to save the hash in the database using Prisma. When the user logs in at a later point we need to use bcrypt.compare() to check if the password they used matches the hash stored in the database.

https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/

## JSON Web Tokens:

This is what we use for stateless authentication. HTTP requests are stateless as the server forgets who you are when you refresh etc, we can use this as a way to show a player is logged in without forcing them to sign in every time.

JWT is in 3 parts. The header, payload and signature. When a user successfully logs in, the server will generate a JWT containing the users data (player id) and signs it with a secret key. The server sends this JWT back to the players browser. The browser saves this token and attaches it to every future request. The server verifies the tokens signature, knowing which player is taking the action.

We can set the timeframe for how long the token lasts:

const jwt = require('jsonwebtoken');

// Generate a token that lasts for 2 hours
const token = jwt.sign(
  { userId: user.id }, 
  process.env.JWT_SECRET, 
  { expiresIn: '2h' } // <--- Expiration time configured here
);

https://www.geeksforgeeks.org/node-js/jwt-authentication-with-node-js/

SO in summary we can use these steps to create game accounts:

Phase 1: The Sign-Up Flow (Creating the Account)

1. The Request (Express): A player submits their sign-up form. Express catches this request at the /register endpoint.
2. The Security (Bcrypt): Express immediately takes the player's plain-text password and asks Bcrypt to turn it into a secure hash.
3. The Save (Prisma to Neon): Express hands the username and the hashed password to Prisma. Prisma translates this into a SQL INSERT command and sends it over the internet directly to your Neon PostgreSQL database.
4. The Storage (Neon): The Neon serverless database permanently stores this new user record in the cloud.
Phase 2: The Login Flow (Accessing the Account)

1. The Request (Express): A player submits their login form. Express catches this request at the /login endpoint.
2. The Lookup (Prisma to Neon): Express asks Prisma to check the database: "Do we have a user with this email?". Prisma translates this into a SQL query and sends it over the network to the Neon database.
3. The Return (Neon to Prisma): The Neon database wakes up, finds the user record, and sends the data (including the stored hashed password) back to Prisma.
4. The Verification (Bcrypt): Express takes the password the player just typed and asks Bcrypt to compare it against the hashed password that Prisma retrieved from Neon.
5. The Authorization (JWT): If Bcrypt confirms they match, Express uses the jsonwebtoken package to generate a token containing the player's Neon database ID.
6. The Hand-off: Express sends a "Success" response back to the player, along with the JWT. The player is now fully logged in and ready to join a multiplayer lobby.

---
# Leaderboards

If we are using a relational database like Neon, we can create a leaderboard table that stores player scores. Each time a game ends, we can update the player's score in the database. We can then query the leaderboard table to display the top players.

## 1. Database Setup (The Prisma Schema)

- Define the structure in schema.prisma. Create a users table and a related scores (leaderboard) table.
- Establish a relation so every score references a user's ID (foreign key).
- Add an index on the score column to optimise ORDER BY operations for large player counts.

Example Prisma models (illustrative):

```prisma
model User {
  id           Int     @id @default(autoincrement())
  username     String  @unique
  passwordHash String
  scores       Score[]
}

model Score {
  id     Int  @id @default(autoincrement())
  user   User @relation(fields: [userId], references: [id])
  userId Int
  score  Int
  @@index([score])
}
```

## 2. Updating the Score (The Game Loop)

- When a game ends, your Node.js server captures the result and emits an event.
- The server uses Prisma to update the player's score in Neon.
- Use upsert to update an existing leaderboard row or create a new one if this is the player's first game.

Conceptual example using Prisma:

```ts
await prisma.score.upsert({
  where: { userId: playerId },
  update: { score: { increment: pointsEarned } },
  create: { userId: playerId, score: pointsEarned }
});
```

## 3. Querying the Top Players (The SQL Ranking)

- To display numbered ranks (1st, 2nd, 3rd), use a raw SQL query with PostgreSQL's RANK() window function; Prisma requires raw SQL for ranking with row numbers.
- RANK() evaluates the dataset and assigns a rank ordered by score DESC. Ties receive the same rank; ranks after ties skip accordingly (e.g., two players tied at rank 2 means next rank is 4).

Example raw SQL for Neon/Postgres:

```sql
SELECT user_id, score, RANK() OVER (ORDER BY score DESC) AS rank
FROM public.scores
ORDER BY score DESC
LIMIT 100;
```

- Implementing ranking in the database keeps sorting, tie-handling and pagination efficient and accurate for real-time leaderboards.

