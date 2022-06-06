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
exports.User = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var accounts_1 = require("./accounts");
var config_1 = __importDefault(require("../config/config"));
var random_int_1 = __importDefault(require("../services/random_int"));
//get the user model
var user_model = database_1.default.User;
var account_obj = new accounts_1.Account();
//class of CRUD operation in user model
var User = /** @class */ (function () {
    function User() {
    }
    //show all rows in the user table
    User.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model.findAll({ where: { role: 'user' } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error("".concat(e_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //show one row in the user table
    User.prototype.show = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model.findOne({ where: { slug: slug } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw new Error("".concat(e_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //add new row in the user table
    User.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hash = bcrypt_1.default.hashSync(u.password + config_1.default.extra_password, parseInt(config_1.default.password_round));
                        u.password = hash;
                        return [4 /*yield*/, user_model.create(u)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw new Error("".concat(e_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //update exist row in the user table
    User.prototype.update = function (email, name, slug, phone, old_slug) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model.update({ email: email, name: name, slug: slug, phone: phone }, { where: { slug: old_slug }, returning: true })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 2:
                        e_4 = _a.sent();
                        throw new Error("".concat(e_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //delete one row in the user table
    User.prototype.delete = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, account_obj.delete(slug)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, user_model.destroy({ where: { slug: slug } })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, 'deleted'];
                    case 3:
                        e_5 = _a.sent();
                        throw new Error("".concat(e_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //login
    User.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, exist_password, isTrue, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model.findOne({ where: { email: email } })];
                    case 1:
                        result = _a.sent();
                        exist_password = result === null || result === void 0 ? void 0 : result.getDataValue('password');
                        return [4 /*yield*/, bcrypt_1.default.compare(password + config_1.default.extra_password, exist_password)];
                    case 2:
                        isTrue = _a.sent();
                        if (isTrue)
                            return [2 /*return*/, result];
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        throw new Error('Email or password wrong.');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //update exist row in the user table
    User.prototype.update_from_admin = function (accepted, status, slug) {
        return __awaiter(this, void 0, void 0, function () {
            var result, obj, id_, num, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model.update({ accepted: accepted, status: status }, { where: { slug: slug }, returning: true })];
                    case 1:
                        result = _a.sent();
                        obj = JSON.parse(JSON.stringify(result));
                        id_ = obj[1][0].id;
                        if (accepted && status === 'active') {
                            num = (0, random_int_1.default)(id_);
                            account_obj.create(slug, num);
                        }
                        return [2 /*return*/, 'updated'];
                    case 2:
                        e_7 = _a.sent();
                        throw new Error("".concat(e_7));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //add new row in the user table
    User.prototype.reset_password = function (password, slug) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hash = bcrypt_1.default.hashSync(password + config_1.default.extra_password, parseInt(config_1.default.password_round));
                        password = hash;
                        return [4 /*yield*/, user_model.update({ password: password }, { where: { slug: slug }, returning: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_8 = _a.sent();
                        throw new Error("".concat(e_8));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.User = User;
