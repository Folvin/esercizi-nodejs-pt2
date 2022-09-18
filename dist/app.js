"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const app = (0, express_1.default)();
const games = [{ name: "league of legends", releaseYear: 2009 }, { name: "monster hunter world", releaseYear: 2018 }];
app.get("/games", async (request, response) => {
    response.json(games);
});
exports.default = app;
