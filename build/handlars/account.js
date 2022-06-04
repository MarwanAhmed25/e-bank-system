"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_1 = require("../models/accounts");
const pagination_1 = __importDefault(require("../services/pagination"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const account_obj = new accounts_1.Account();
const secret = config_1.default.secret;
//return a json data for all Accounts in database
async function index(req, res) {
    const token = req.headers.token;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        if (permisson) {
            let result = await account_obj.index();
            if (user.role === 'user') {
                result = result.filter(a => a.getDataValue('accepted') == true);
                //if page exist will paginate
                const paginated_result = (0, pagination_1.default)(page, limit, result);
                return res.status(200).json(paginated_result);
            }
            //if page exist will paginate
            const paginated_result = (0, pagination_1.default)(page, limit, result);
            return res.status(200).json(paginated_result);
        }
        res.status(400).json('not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return a json data for one Account in database
async function show(req, res) {
    const token = req.headers.token;
    const slug = req.params.slug;
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        if (permisson && ((user.slug === slug) || (user.role === 'admin'))) {
            const result = await account_obj.show(slug);
            return res.status(200).json(result); //result
        }
        return res.status(400).json('Not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//update and return a json data for the Account in database
async function update(req, res) {
    const token = req.headers.token;
    const slug = req.params.slug;
    const balance = req.body.balance;
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        const account = await account_obj.show(slug);
        const isAccepted = account === null || account === void 0 ? void 0 : account.getDataValue('accepted');
        if (permisson && isAccepted && user.slug === slug) {
            const result = await account_obj.update(balance, slug);
            return res.status(200).json(result);
        }
        res.status(400).json('not allowed. may be account pedding or need to login');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//update and return a json data for the Account in database
async function approve(req, res) {
    const token = req.headers.token;
    const slug = req.params.slug;
    const accepted = req.body.accepted;
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        if (permisson && user.role === 'admin') {
            const result = await account_obj.approve(accepted, slug);
            return res.status(200).json(result);
        }
        res.status(400).json('not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//main routes of Account model
function mainRoutes(app) {
    app.get('/users/accounts', index);
    app.get('/users/accounts/:slug', show);
    app.patch('/users/accounts/:slug', update);
    app.post('/users/accounts/:slug/approve_account', approve);
}
exports.default = mainRoutes;
// hash password, bycript token when create, 
