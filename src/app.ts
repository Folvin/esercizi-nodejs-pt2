import express from "express";
import "express-async-errors";

import prisma from "./lib/prisma/client";

import {
   validate,
   gameSchema,
   GameData,
   validationErrorMiddleware,
} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/games", async (request, response) => {
   const games = await prisma.games.findMany();
   response.json(games);
});

app.get("/games/:id(\\d+)", async (request, response, next) => {
   const gameId = Number(request.params.id);

   const game = await prisma.games.findUnique({
      where: {id: gameId},
   });
   if (!game) {
      response.status(404);
      return next(`Cannot GET /games/${gameId}`);
   }
   response.json(game);
});

app.post("/games", validate({body: gameSchema}), async (request, response) => {
   const gameData: GameData = request.body;
   const game = await prisma.games.create({
      data: gameData,
   });
   response.status(201).json(game);
});

app.use(validationErrorMiddleware);

export default app;
