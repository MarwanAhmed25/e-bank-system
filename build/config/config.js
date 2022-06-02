"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    secret: process.env.secret,
    extra_password: process.env.extra_password,
    password_round: process.env.password_round,
    DB_URL: process.env.DB_URL
};
exports.default = config;
