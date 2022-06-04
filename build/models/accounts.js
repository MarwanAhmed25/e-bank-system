"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const database_1 = __importDefault(require("../database"));
//get the account model
const account_model = database_1.default.Account;
//class of CRUD operation in account model
class Account {
    //show all rows in the account table
    async index() {
        try {
            return await account_model.findAll();
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the account table
    async show(userSlug) {
        try {
            return await account_model.findOne({ where: { userSlug: userSlug } });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the account table
    async show_by_account_number(account_number) {
        try {
            return await account_model.findOne({ where: { account_number: account_number } });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the account table
    async create(userSlug, account_number) {
        try {
            const exist = await this.show(userSlug);
            if (exist)
                return exist;
            return await account_model.create({ balance: 0, accepted: false, userSlug: userSlug, account_number: account_number });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the account table
    async update(balance, userSlug) {
        try {
            const result = await account_model.update({ balance }, { where: { userSlug: userSlug }, returning: true });
            return result;
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the account table
    async approve(accepted, userSlug) {
        try {
            const result = await account_model.update({ accepted }, { where: { userSlug: userSlug }, returning: true });
            return result;
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the account table
    async delete(userSlug) {
        try {
            const result = await account_model.destroy({ where: { userSlug: userSlug } });
            return 'deleted';
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
}
exports.Account = Account;
;
