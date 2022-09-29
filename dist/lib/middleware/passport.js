"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_github2_1 = __importDefault(require("passport-github2"));
const githubStrategy = new passport_github2_1.default.Strategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "",
}, function (accessToken, refreshToken, profile, done) {
    const user = {
        username: profile.username,
    };
    done(null, user);
});
passport_1.default.use(githubStrategy);
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
