import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";

const app = express();

app.get("/games", async (request, response) => {
  const body = await prisma.games.findMany();
  response.json(body);
});

export default app;
