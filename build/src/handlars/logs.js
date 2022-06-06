"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = require("../models/logs");
const accounts_1 = require("../models/accounts");
const pagination_1 = __importDefault(require("../services/pagination"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const random_int_1 = __importDefault(require("../services/random_int"));
const log_obj = new logs_1.Log();
const account_obj = new accounts_1.Account();
const secret = config_1.default.secret;
//return a json data for all Accounts in database
async function index(req, res) {
    const token = req.headers.token;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    const account_number = Number(req.query.account_number);
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        console.log(user);
        if (permisson && user.role === 'admin') {
            let result = await log_obj.index();
            if (account_number) {
                result = result.filter(a => a.getDataValue('sender') === account_number || a.getDataValue('reciver') === account_number);
            }
            //if page exist will paginate
            const paginated_result = (0, pagination_1.default)(page, limit, result);
            return res.status(200).json(paginated_result);
        }
        res.status(400).json('not allowed for you.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return a json data for one Account in database
async function show(req, res) {
    const token = req.headers.token;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        console.log(user);
        if (permisson) {
            const account = await account_obj.show(user.slug);
            const account_number = account === null || account === void 0 ? void 0 : account.getDataValue('account_number');
            const result = await log_obj.show(account_number);
            const paginated_result = (0, pagination_1.default)(page, limit, result);
            return res.status(200).json(paginated_result); //result
        }
        return res.status(400).json('Not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//create and return a json data for the user in database
async function create(req, res) {
    const token = req.headers.token;
    const l = req.body;
    try {
        //convert token to Account object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        console.log(user);
        if (user.status != 'active')
            return res.status(400).json('User not active.');
        const sender = await account_obj.show(user.slug);
        const reciver = await account_obj.show_by_account_number(l.reciver);
        if (!sender)
            return res.status(400).json('login please .');
        if (!reciver)
            return res.status(400).json('please enter a valid reciver number.');
        const permisson = jsonwebtoken_1.default.verify(token, secret);
        if (permisson) {
            l.created_at = new Date();
            l.operation_number = (0, random_int_1.default)(user.id);
            l.sender = sender === null || sender === void 0 ? void 0 : sender.getDataValue('account_number');
            let sender_balance = sender === null || sender === void 0 ? void 0 : sender.getDataValue('balance');
            let reciver_balance = reciver === null || reciver === void 0 ? void 0 : reciver.getDataValue('balance');
            const sender_acceppted = sender === null || sender === void 0 ? void 0 : sender.getDataValue('accepted');
            if (sender_balance < l.amount) {
                return res.status(400).json('Your balance is less than amount.');
            }
            if (!sender_acceppted)
                return res.status(400).json('your account pendding.');
            sender_balance -= l.amount;
            await account_obj.update(sender_balance, user.slug);
            await account_obj.update(reciver_balance + l.amount, reciver === null || reciver === void 0 ? void 0 : reciver.getDataValue('userSlug'));
            const result = await log_obj.create(l);
            return res.status(200).json(result);
        }
        res.status(400).json('login first');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//main routes of Account model
function mainRoutes(app) {
    app.get('/all_logs', index);
    app.get('/logs', show);
    app.post('/logs', create);
}
exports.default = mainRoutes;
// hash password, bycript token when create, 
