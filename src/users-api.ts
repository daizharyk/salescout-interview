// Create an API using Node.js and Express:
// 1. POST /user - adds a user.
// 2. GET /users - returns all users.

// Use Express library

import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

interface User {
  name: string;
}

const users: User[] = [];

app.post("/user", (req: Request<{}, {}, User>, res: Response) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Name is required" });
  }
  users.push({ name });
  res.status(201).json({ message: "User created", user: { name } });
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});



export default app;
