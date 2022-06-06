"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var accounts_1 = require("../models/accounts");
var pagination_1 = __importDefault(require("../services/pagination"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var account_obj = new accounts_1.Account();
var secret = config_1.default.secret;
//return a json data for all Accounts in database
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, page, limit, x, user, permisson, result, paginated_result_1, paginated_result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    page = Number(req.query.page);
                    limit = Number(req.query.limit) || 20;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    permisson = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!permisson) return [3 /*break*/, 3];
                    return [4 /*yield*/, account_obj.index()];
                case 2:
                    result = _a.sent();
                    if (user.role === 'user') {
                        result = result.filter(function (a) { return a.getDataValue('accepted') == true; });
                        paginated_result_1 = (0, pagination_1.default)(page, limit, result);
                        return [2 /*return*/, res.status(200).json(paginated_result_1)];
                    }
                    paginated_result = (0, pagination_1.default)(page, limit, result);
                    return [2 /*return*/, res.status(200).json(paginated_result)];
                case 3:
                    res.status(400).json('not allowed.');
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    res.status(400).json("".concat(e_1));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//return a json data for one Account in database
function show(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, slug, x, user, permisson, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    slug = req.params.slug;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    permisson = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(permisson && (user.slug === slug || user.role === 'admin'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, account_obj.show(slug)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).json(result)]; //result
                case 3: return [2 /*return*/, res.status(400).json('Not allowed.')];
                case 4:
                    e_2 = _a.sent();
                    res.status(400).json("".concat(e_2));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//update and return a json data for the Account in database
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, slug, balance, x, user, permisson, account, isAccepted, result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    slug = req.params.slug;
                    balance = req.body.balance;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    permisson = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    return [4 /*yield*/, account_obj.show(slug)];
                case 2:
                    account = _a.sent();
                    isAccepted = account === null || account === void 0 ? void 0 : account.getDataValue('accepted');
                    if (!(permisson && isAccepted && user.slug === slug)) return [3 /*break*/, 4];
                    return [4 /*yield*/, account_obj.update(balance, slug)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).json(result)];
                case 4:
                    res
                        .status(400)
                        .json('not allowed. may be account pedding or need to login');
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _a.sent();
                    res.status(400).json("".concat(e_3));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//update and return a json data for the Account in database
function approve(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, slug, accepted, x, user, permisson, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    slug = req.params.slug;
                    accepted = req.body.accepted;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    permisson = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(permisson && user.role === 'admin')) return [3 /*break*/, 3];
                    return [4 /*yield*/, account_obj.approve(accepted, slug)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).json(result)];
                case 3:
                    res.status(400).json('not allowed.');
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    res.status(400).json("".concat(e_4));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
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
