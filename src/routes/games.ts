import express, {Router} from "express";

import prisma from "../lib/prisma/client";

import {validate, gameSchema, GameData} from "../lib/middleware/validation";

import {initMulterMiddleware} from "../lib/middleware/multer";

import {checkAuthorization} from "../lib/middleware/passport";

const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
  const games = await prisma.games.findMany();
  response.json(games);
});

router.get("/:id(\\d+)", async (request, response, next) => {
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

router.post("/", checkAuthorization, validate({body: gameSchema}), async (request, response) => {
  const gameData: GameData = request.body;

  const game = await prisma.games.create({
    data: gameData,
  });

  response.status(201).json(game);
});

router.put("/:id(\\d+)", checkAuthorization, validate({body: gameSchema}), async (request, response, next) => {
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
});

router.delete("/:id(\\d+)", checkAuthorization, async (request, response, next) => {
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

router.post("/:id(\\d+)/photo", checkAuthorization, upload.single("photo"), async (request, response, next) => {
  if (!request.file) {
    response.status(400);
    return next("No photo file uploaded");
  }

  const gameId = Number(request.params.id);
  const photoFilename = request.file.filename;

  try {
    await prisma.games.update({
      where: {id: gameId},
      data: {photoFilename},
    });
    response.status(201).json({photoFilename});
  } catch (error) {
    response.status(404);
    next(`Cannot POST /games/${gameId}/photo`);
  }
});

router.use("/photos", express.static("uploads"));

export default router;
