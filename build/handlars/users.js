"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const pagination_1 = __importDefault(require("../services/pagination"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const send_mail_1 = __importDefault(require("../services/send_mail"));
const user_obj = new users_1.User();
const secret = config_1.default.secret;
//return a json data for all users in database
async function index(req, res) {
    const token = req.headers.token;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    try {
        //convert token to user object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const perrmission = jsonwebtoken_1.default.verify(token, secret);
        if (user.role === 'admin' && perrmission) {
            const result = await user_obj.index();
            //if page exist will paginate
            const paginated_result = (0, pagination_1.default)(page, limit, result);
            res.status(200).json(paginated_result);
        }
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return a json data for one user in database
async function show(req, res) {
    const token = req.headers.token;
    const slug = req.params.slug;
    try {
        //convert token to user object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const perrmission = jsonwebtoken_1.default.verify(token, secret);
        if (perrmission && ((user.slug === slug) || (user.role === 'admin'))) {
            const result = await user_obj.show(slug);
            return res.status(200).json(result); //result
        }
        return res.status(400).json('Not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
/**
 * create token
 *
 *
 */
//create and return a json data for the user in database
async function create(req, res) {
    const u = req.body;
    try {
        u.status = 'active';
        u.slug = u.email.split('@')[0];
        u.accepted = false;
        //if name not exist the defualt is slug
        if (!u.name)
            u.name = u.slug;
        const result = await user_obj.create(u);
        const token = jsonwebtoken_1.default.sign({ user: result }, secret);
        res.status(200).json({ user: result, token: token }); //result, token
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//update and return a json data for the user in database
async function update(req, res) {
    const token = req.headers.token;
    const slug = req.params.slug;
    const u = req.body;
    try {
        const exist_user = await user_obj.show(slug);
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
        //convert token to user object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const perrmission = jsonwebtoken_1.default.verify(token, secret);
        if (perrmission && user.slug === slug) {
            const result = await user_obj.update(u.email, u.name, u.slug, u.phone, exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('slug'));
            const token = jsonwebtoken_1.default.sign({ user: result }, secret);
            return res.status(200).json({ user: result, token: token }); // result, token
        }
        return res.status(400).json('Not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//delete the user in database
async function delete_(req, res) {
    const token = req.headers.token;
    const slug = req.params.slug;
    try {
        //convert token to user object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const perrmission = jsonwebtoken_1.default.verify(token, secret);
        if (perrmission && user.slug === slug) {
            const result = await user_obj.delete(slug);
            res.status(200).json(result);
        }
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//return token for user and login the user using email and password from request body
async function login(req, res) {
    const { email, password } = req.body; //required
    try {
        //search in database by input data
        const result = await user_obj.login(email, password);
        const status = result === null || result === void 0 ? void 0 : result.getDataValue('status');
        if (status === 'suspended')
            return res.status(400).json('User suspended.');
        const token = jsonwebtoken_1.default.sign({ user: result }, secret);
        res.status(200).json({ user: result, token: token });
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//virfy user
async function approve_user(req, res) {
    const token = req.headers.token;
    let status = req.body.status;
    let accepted = req.body.accepted;
    const slug = req.params.slug;
    try {
        const exist_user = await user_obj.show(slug);
        if (!status) {
            status = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('status');
        }
        if (!accepted) {
            accepted = exist_user === null || exist_user === void 0 ? void 0 : exist_user.getDataValue('accepted');
        }
        //convert token to user object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const perrmission = jsonwebtoken_1.default.verify(token, secret);
        if (perrmission && user.role === 'admin') {
            const result = await user_obj.update_from_admin(accepted, status, slug);
            return res.status(200).json({ user: result }); // result
        }
        return res.status(400).json('Not allowed.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//forget password
async function forget_password(req, res) {
    const email = req.body.email;
    try {
        const slug = email.split('@')[0];
        const result = await user_obj.show(slug);
        const status = result === null || result === void 0 ? void 0 : result.getDataValue('status');
        if (status === 'suspended')
            return res.status(400).json('user suspended.');
        const token = jsonwebtoken_1.default.sign({ user: result }, secret);
        const url = '' + token;
        //sending mail to email with url
        const sent = (0, send_mail_1.default)(email, 'Reset password', url);
        return res.status(200).json('Ckeck your mail.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
}
//reset password
async function reset_password(req, res) {
    const token = req.headers.token;
    const password = req.body.password;
    try {
        //convert token to user object
        const x = (0, jwt_decode_1.default)(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const perrmission = jsonwebtoken_1.default.verify(token, secret);
        if (perrmission) {
            const result = await user_obj.reset_password(password, user.slug);
            const new_token = jsonwebtoken_1.default.sign({ user: result }, secret);
            return res.status(200).json({ user: result, token: new_token });
        }
        return res.status(400).json('login first.');
    }
    catch (e) {
        res.status(400).json(`${e}`);
    }
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
