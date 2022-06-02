"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const users_1 = __importDefault(require("./handlars/users"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
//initial port and app
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
//usig middel ware cors and body parser
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
//configre the server to listen to port and running it
app.listen(PORT, () => {
    database_1.default.create();
    console.log(`server running on port ${PORT}...`);
});
(0, users_1.default)(app);
//export the app to use when importing the file
exports.default = app;
