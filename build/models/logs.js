"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const database_1 = __importDefault(require("../database"));
//get the account model
const log_model = database_1.default.Logs;
//class of CRUD operation in account model
class Log {
    //show all rows in the account table
    async index() {
        try {
            return await log_model.findAll();
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the account table
    async show(account_number) {
        try {
            return await log_model.findAll({ where: { sender: account_number } });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the account table
    async create(l) {
        try {
            return await log_model.create(l);
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
}
exports.Log = Log;
;
