"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock("./passport", () => {
    const originalModule = jest.requireActual("./passport");
    const checkAuthorization = (request, response, next) => {
        next();
    };
    return {
        __esModule: true,
        ...originalModule,
        checkAuthorization,
    };
});
