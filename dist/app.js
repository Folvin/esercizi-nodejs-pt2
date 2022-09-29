"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const client_1 = __importDefault(require("./lib/prisma/client"));
const validation_1 = require("./lib/validation");
const multer_1 = require("./lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const corsOptions = {
    origin: "http://localhost:8080",
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/games", async (request, response) => {
    const games = await client_1.default.games.findMany();
    response.json(games);
});
app.get("/games/:id(\\d+)", async (request, response, next) => {
    const gameId = Number(request.params.id);
    const game = await client_1.default.games.findUnique({
        where: { id: gameId },
    });
    if (!game) {
        response.status(404);
        return next(`Cannot GET /games/${gameId}`);
    }
    response.json(game);
});
app.post("/games", (0, validation_1.validate)({ body: validation_1.gameSchema }), async (request, response) => {
    const gameData = request.body;
    const game = await client_1.default.games.create({
        data: gameData,
    });
    response.status(201).json(game);
});
app.put("/games/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.gameSchema }), async (request, response, next) => {
    const gameId = Number(request.params.id);
    const gameData = request.body;
    try {
        const game = await client_1.default.games.update({
            where: { id: gameId },
            data: gameData,
        });
        response.status(200).json(game);
    }
    catch (error) {
        response.status(404);
        next(`Cannot PUT /games/${gameId}`);
    }
});
app.delete("/games/:id(\\d+)", async (request, response, next) => {
    const gameId = Number(request.params.id);
    try {
        await client_1.default.games.delete({
            where: { id: gameId },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot DELETE /games/${gameId}`);
    }
});
app.post("/games/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
    if (!request.file) {
        response.status(400);
        return next("No photo file uploaded");
    }
    const gameId = Number(request.params.id);
    const photoFilename = request.file.filename;
    try {
        await client_1.default.games.update({
            where: { id: gameId },
            data: { photoFilename },
        });
        response.status(201).json({ photoFilename });
    }
    catch (error) {
        response.status(404);
        next(`Cannot POST /games/${gameId}/photo`);
    }
});
app.use("/games/photos", express_1.default.static("uploads"));
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
