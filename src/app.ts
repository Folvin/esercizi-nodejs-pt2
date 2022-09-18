import express from "express";
import "express-async-errors";

const app = express();

const games = [{name: "league of legends", releaseYear: 2009}, {name: "monster hunter world", releaseYear: 2018}]

app.get("/", async (request, response) => {

  response.json(games);
});

export default app;
