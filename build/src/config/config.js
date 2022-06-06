"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    //for jwt token
    secret: process.env.secret,
    //password hashing
    extra_password: process.env.extra_password,
    password_round: process.env.password_round,
    //for email
    user_email: process.env.user_email,
    password_email: process.env.user_password,
    //database
    db_host: process.env.db_host || 'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
    db_user: process.env.db_user || 'nowcexnbaevbru',
    db_password: process.env.db_password ||
        'd798bc7f4fa2e5591aeb98296bf90e0eb80123ba3a8a04772795f9371cb3acfc',
    db_name: process.env.db_name || 'd4inkvgfkimblv',
    db_port: process.env.db_port || 5432,
    db_dilect: process.env.db_dilect || 'postgres',
    //url for local database
    DB_URL_LOCAL: process.env.db_url_local,
};
exports.default = config;
