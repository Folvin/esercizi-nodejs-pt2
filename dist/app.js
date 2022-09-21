"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = __importDefault(require("./lib/prisma/client"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/games", async (request, response) => {
    const body = await client_1.default.games.findMany();
    response.json(body);
});
app.post("/games", async (request, response) => {
    const game = request.body;
    response.status(201).json(game);
});
exports.default = app;
