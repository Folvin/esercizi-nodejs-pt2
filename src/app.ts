import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";

const app = express();

app.use(express.json());

app.get("/games", async (request, response) => {
  const body = await prisma.games.findMany();
  response.json(body);
});

app.post("/games", async (request, response) => {
  const game = request.body;
  response.status(201).json(game);
});

export default app;
