"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const client_1 = __importDefault(require("../lib/prisma/client"));
const validation_1 = require("../lib/middleware/validation");
const multer_1 = require("../lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const router = (0, express_1.Router)();
router.get("/", async (request, response) => {
    const games = await client_1.default.games.findMany();
    response.json(games);
});
router.get("/:id(\\d+)", async (request, response, next) => {
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
router.post("/", (0, validation_1.validate)({ body: validation_1.gameSchema }), async (request, response) => {
    const gameData = request.body;
    const game = await client_1.default.games.create({
        data: gameData,
    });
    response.status(201).json(game);
});
router.put("/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.gameSchema }), async (request, response, next) => {
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
router.delete("/:id(\\d+)", async (request, response, next) => {
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
router.post("/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
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
router.use("/photos", express_1.default.static("uploads"));
exports.default = router;
