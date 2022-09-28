"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.gameSchema = typebox_1.Type.Object({
    game: typebox_1.Type.String(),
    releaseYear: typebox_1.Type.Integer(),
    rating: typebox_1.Type.Optional(typebox_1.Type.Integer())
}, { additionalProperties: false });
