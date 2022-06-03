"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const accounts_1 = require("./accounts");
const config_1 = __importDefault(require("../config/config"));
const random_int_1 = __importDefault(require("../services/random_int"));
//get the user model
const user_model = database_1.default.User;
const account_obj = new accounts_1.Account();
//class of CRUD operation in user model
class User {
    //show all rows in the user table
    async index() {
        try {
            return await user_model.findAll({ where: { role: 'user' } });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the user table
    async show(slug) {
        try {
            return await user_model.findOne({ where: { slug: slug } });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async create(u) {
        try {
            //hashin password using round and extra from .env file and password from request.body
            const hash = bcrypt_1.default.hashSync(u.password + config_1.default.extra_password, parseInt(config_1.default.password_round));
            u.password = hash;
            return await user_model.create(u);
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the user table
    async update(email, name, slug, phone, old_slug) {
        try {
            const result = await user_model.update({ email, name, slug, phone }, { where: { slug: old_slug }, returning: true });
            console.log(result);
            return result;
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the user table
    async delete(slug) {
        try {
            await account_obj.delete(slug);
            const result = await user_model.destroy({ where: { slug: slug } });
            return 'deleted';
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //login
    async login(email, password) {
        try {
            const result = await user_model.findOne({ where: { email: email } });
            const exist_password = result === null || result === void 0 ? void 0 : result.getDataValue('password');
            const isTrue = await bcrypt_1.default.compare(password + config_1.default.extra_password, exist_password);
            if (isTrue)
                return result;
        }
        catch (e) {
            throw new Error('Email or password wrong.');
        }
    }
    //update exist row in the user table
    async update_from_admin(accepted, status, slug) {
        try {
            const result = await user_model.update({ accepted, status }, { where: { slug: slug }, returning: true });
            const obj = JSON.parse(JSON.stringify(result));
            const id_ = obj[1][0].id;
            if (accepted && status === 'active') {
                const num = (0, random_int_1.default)(id_);
                account_obj.create(slug, num);
            }
            return 'updated';
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async reset_password(password, slug) {
        try {
            //hashin password using round and extra from .env file and password from request.body
            const hash = bcrypt_1.default.hashSync(password + config_1.default.extra_password, parseInt(config_1.default.password_round));
            password = hash;
            return await user_model.update({ password }, { where: { slug: slug }, returning: true });
        }
        catch (e) {
            throw new Error(`${e}`);
        }
    }
}
exports.User = User;
;
