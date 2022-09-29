import express from "express";
import "express-async-errors";
import cors from "cors";

import prisma from "./lib/prisma/client";

import {
  validate,
  gameSchema,
  GameData,
  validationErrorMiddleware,
} from "./lib/validation";

import {initMulterMiddleware} from "./lib/middleware/multer";

const upload = initMulterMiddleware();

const corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

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

app.put(
  "/games/:id(\\d+)",
  validate({body: gameSchema}),
  async (request, response, next) => {
    const gameId = Number(request.params.id);
    const gameData: GameData = request.body;

    try {
      const game = await prisma.games.update({
        where: {id: gameId},
        data: gameData,
      });
      response.status(200).json(game);
    } catch (error) {
      response.status(404);
      next(`Cannot PUT /games/${gameId}`);
    }
  }
);

app.delete("/games/:id(\\d+)", async (request, response, next) => {
  const gameId = Number(request.params.id);

  try {
    await prisma.games.delete({
      where: {id: gameId},
    });

    response.status(204).end();
  } catch (error) {
    response.status(404);
    next(`Cannot DELETE /games/${gameId}`);
  }
});

app.post(
  "/games/:id(\\d+)/photo",
  upload.single("photo"),
  async (request, response, next) => {
    console.log("request.file", request.file);

    if (!request.file) {
      response.status(400);
      return next("No photo file uploaded");
    }

    const photoFilename = request.file.filename;

    response.status(201).json({photoFilename});
  }
);

app.use(validationErrorMiddleware);

export default app;
