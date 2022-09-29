"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSetting = "warning: no value set for this environment variable";
const config = {
    PORT: process.env.PORT || missingSetting,
};
exports.default = config;
