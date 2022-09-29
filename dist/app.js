"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const validation_1 = require("./lib/middleware/validation");
const cors_1 = require("./lib/middleware/cors");
const games_1 = __importDefault(require("./routes/games"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.initCorsMiddleware)());
app.use("/games", games_1.default);
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
