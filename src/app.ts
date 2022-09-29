import express from "express";
import "express-async-errors";

import {validationErrorMiddleware} from "./lib/middleware/validation";
import {initCorsMiddleware} from "./lib/middleware/cors";

import gamesRoutes from "./routes/games";

const app = express();

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/games", gamesRoutes);

app.use(validationErrorMiddleware);

export default app;
