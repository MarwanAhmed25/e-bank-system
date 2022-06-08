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
var users_1 = require("../models/users");
var pagination_1 = __importDefault(require("../services/pagination"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var send_mail_1 = __importDefault(require("../services/send_mail"));
var password_validate_1 = __importDefault(require("../services/password_validate"));
var user_obj = new users_1.User();
var secret = config_1.default.secret;
//return a json data for all users in database
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, page, limit, x, user, perrmission, result, paginated_result, e_1;
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
                    perrmission = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(user.role === 'admin' && perrmission)) return [3 /*break*/, 3];
                    return [4 /*yield*/, user_obj.index()];
                case 2:
                    result = _a.sent();
                    paginated_result = (0, pagination_1.default)(page, limit, result);
                    res.status(200).json(paginated_result);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    res.status(400).json("".concat(e_1));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//return a json data for one user in database
function show(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, slug, x, user, perrmission, result, e_2;
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
                    perrmission = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(perrmission && (user.slug === slug || user.role === 'admin'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, user_obj.show(slug)];
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
//create and return a json data for the user in database
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var u, result, token, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    u = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!(0, password_validate_1.default)(u.password))
                        throw new Error('please enter a password more than 7 character with one capital letter and one symbol at least of [-,*,+,@,$,&].');
                    u.status = 'active';
                    u.slug = u.email.split('@')[0];
                    u.accepted = false;
                    //if name not exist the defualt is slug
                    if (!u.name)
                        u.name = u.slug;
                    return [4 /*yield*/, user_obj.create(u)];
                case 2:
                    result = _a.sent();
                    token = jsonwebtoken_1.default.sign({ user: result }, secret);
                    res.status(200).json({ user: result, token: token }); //result, token
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    res.status(400).json("".concat(e_3));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//update and return a json data for the user in database
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, slug, u, exist_user, x, user, perrmission, result, token_1, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    slug = req.params.slug;
                    u = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, user_obj.show(slug)];
                case 2:
                    exist_user = _a.sent();
                    if (u.email) {
                        u.slug = u.email.split('@')[0];
                        if (!u.name)
                            u.name = u.slug;
                    }
                    else {
                        u.email = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('email');
                        u.name = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('name');
                        u.slug = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('slug');
                    }
                    if (!u.phone) {
                        u.phone = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('phone');
                    }
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    perrmission = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(perrmission && user.slug === slug)) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_obj.update(u.email, u.name, u.slug, u.phone, exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('slug'))];
                case 3:
                    result = _a.sent();
                    token_1 = jsonwebtoken_1.default.sign({ user: result }, secret);
                    return [2 /*return*/, res.status(200).json({ user: result, token: token_1 })]; // result, token
                case 4: return [2 /*return*/, res.status(400).json('Not allowed.')];
                case 5:
                    e_4 = _a.sent();
                    res.status(400).json("".concat(e_4));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//delete the user in database
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, slug, x, user, perrmission, result, e_5;
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
                    perrmission = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(perrmission && user.slug === slug)) return [3 /*break*/, 3];
                    return [4 /*yield*/, user_obj.delete(slug)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).json(result)];
                case 3: return [2 /*return*/, res.status(400).json('not allowed.')];
                case 4:
                    e_5 = _a.sent();
                    res.status(400).json("".concat(e_5));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//return token for user and login the user using email and password from request body
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, result, status_1, token, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user_obj.login(email, password)];
                case 2:
                    result = _b.sent();
                    status_1 = result === null || result === void 0 ? void 0 : result.getDataValue('status');
                    if (status_1 === 'suspended')
                        return [2 /*return*/, res.status(400).json('User suspended.')];
                    token = jsonwebtoken_1.default.sign({ user: result }, secret);
                    res.status(200).json({ user: result, token: token });
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _b.sent();
                    res.status(400).json("".concat(e_6));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//virfy user
function approve_user(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, status, accepted, slug, exist_user, exist_status, x, user, perrmission, result, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    status = req.body.status;
                    accepted = req.body.accepted;
                    slug = req.params.slug;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, user_obj.show(slug)];
                case 2:
                    exist_user = _a.sent();
                    exist_status = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('status');
                    if (exist_status === 'suspended')
                        return [2 /*return*/, res.status(400).json('user suspended.')];
                    if (!status) {
                        status = exist_status;
                    }
                    if (!accepted) {
                        accepted = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('accepted');
                    }
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    perrmission = jsonwebtoken_1.default.verify(token, secret);
                    console.log(user);
                    if (!(perrmission && user.role === 'admin')) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_obj.update_from_admin(accepted, status, slug)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).json({ user: result })]; // result
                case 4: return [2 /*return*/, res.status(400).json('Not allowed.')];
                case 5:
                    e_7 = _a.sent();
                    res.status(400).json("".concat(e_7));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//forget password
function forget_password(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, slug, result, status_2, token, url, sent, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    slug = email.split('@')[0];
                    return [4 /*yield*/, user_obj.show(slug)];
                case 2:
                    result = _a.sent();
                    status_2 = result === null || result === void 0 ? void 0 : result.getDataValue('status');
                    if (status_2 === 'suspended')
                        return [2 /*return*/, res.status(400).json('user suspended.')];
                    token = jsonwebtoken_1.default.sign({ user: result }, secret);
                    url = '' + token;
                    sent = (0, send_mail_1.default)(email, 'Reset password', url);
                    return [2 /*return*/, res.status(200).json('Ckeck your mail.')];
                case 3:
                    e_8 = _a.sent();
                    res.status(400).json("".concat(e_8));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//reset password
function reset_password(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, password, x, user, perrmission, result, new_token, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.headers.token;
                    password = req.body.password;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    x = (0, jwt_decode_1.default)(token);
                    user = JSON.parse(JSON.stringify(x)).user;
                    perrmission = jsonwebtoken_1.default.verify(token, secret);
                    if (!perrmission) return [3 /*break*/, 3];
                    return [4 /*yield*/, user_obj.reset_password(password, user.slug)];
                case 2:
                    result = _a.sent();
                    new_token = jsonwebtoken_1.default.sign({ user: result }, secret);
                    return [2 /*return*/, res.status(200).json({ user: result, token: new_token })];
                case 3: return [2 /*return*/, res.status(400).json('login first.')];
                case 4:
                    e_9 = _a.sent();
                    res.status(400).json("".concat(e_9));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//main routes of user model
function mainRoutes(app) {
    app.get('/users', index);
    app.get('/users/:slug', show);
    app.post('/users', create);
    app.patch('/users/:slug', update);
    app.delete('/users/:slug', delete_);
    app.post('/login', login);
    app.post('/forget_password', forget_password);
    app.post('/reset_password', reset_password);
    app.post('/approve_user/:slug', approve_user);
}
exports.default = mainRoutes;
// hash password, bycript token when create,
