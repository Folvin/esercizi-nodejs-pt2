import express from "express";
import "express-async-errors";

import prisma from "./lib/prisma/client";

import {validate, gameSchema, GameData, validationErrorMiddleware} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/games", async (request, response) => {
  const body = await prisma.games.findMany();
  response.json(body);
});

app.post("/games", validate({body: gameSchema}), async (request, response) => {
  const game: GameData = request.body;
  response.status(201).json(game);
});

app.use(validationErrorMiddleware)

export default app;
