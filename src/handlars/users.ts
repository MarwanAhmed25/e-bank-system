import { Request, Response, Application } from "express";
import { User, user } from "../models/users";
import parseJwt from "../services/jwt_parse";
import pagination from "../services/pagination";
import jwt from "jsonwebtoken";
import config from '../config/config';
import jwtDecode from "jwt-decode";

const user_obj = new User();
const secret = config.secret as unknown as string;

//return a json data for all users in database
async function index(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    try {
        //convert token to user object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        
        if (user.role === 'admin') {
            const result = await user_obj.index();
            //if page exist will paginate
            const paginated_result = pagination(page, limit, result);
            res.status(200).json(paginated_result);
        }

    } catch (e) {
        res.status(400).json(`${e}`);
    }

}

//return a json data for one user in database
async function show(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const slug = req.params.slug;
    try {
        //convert token to user object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        
        if ((user.slug === slug) || (user.role === 'admin')) {
            const result = await user_obj.show(slug);
            return res.status(200).json(result);//result
        }
        return res.status(400).json('Not allowed.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }

}
/**
 * create token
 * 
 * 
 */
//create and return a json data for the user in database
async function create(req: Request, res: Response) {
    const u: user = req.body;


    try {
        u.status = 'active';
        u.slug = u.email.split('@')[0];
        u.accepted = false;
        //if name not exist the defualt is slug
        if (!(u.name as unknown as string))
            u.name = u.slug;
         
        const result = await user_obj.create(u);
        const token = jwt.sign({ user: result }, secret);
        res.status(200).json({ user: result, token: token });//result, token

    } catch (e) {
        res.status(400).json(`${e}`);
    }

}
//update and return a json data for the user in database
async function update(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const slug = req.params.slug;
    const u: user = req.body;
    try {
        const exist_user = await user_obj.show(slug);
        if (u.email) {
            u.slug = u.email.split('@')[0];
            if (!u.name)
                u.name = u.slug;
        } else {
            u.email = exist_user?.getDataValue('email');
            u.name = exist_user?.getDataValue('name');
            u.slug = exist_user?.getDataValue('slug');
        }
        if (!u.phone) {
            u.phone = exist_user?.getDataValue('phone');
        }
        
        //convert token to user object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        
        if (user.slug === slug) {
            const result = await user_obj.update(u.email, u.name, u.slug as unknown as string, u.phone, exist_user?.getDataValue('slug'));
        const token = jwt.sign({ user: result }, secret);

            return res.status(200).json({ user: result, token: token });// result, token
        }
        return res.status(400).json('Not allowed.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }

}
//delete the user in database
async function delete_(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const slug = req.params.slug;
    try {
        const user_slug = parseJwt(token).slug;
        if (user_slug === slug) {
        const result = await user_obj.delete(slug);

        res.status(200).json(result);
        }

    } catch (e) {
        res.status(400).json(`${e}`);
    }

}
//return token for user and login the user using email and password from request body
async function login(req: Request, res: Response) {
    const { email, password } = req.body;//required

    try {

        //search in database by input data
        const result = await user_obj.login(email, password);
        const status = result?.getDataValue('status');
        if(status === 'suspended')
            return res.status(400).json('User suspended.');

        const token = jwt.sign({ user: result }, secret);
        res.status(200).json({ user: result, token: token });

    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//virfy user
async function approve_user(req:Request, res:Response) {
    const token = req.headers.token as unknown as string;
    let status = req.body.status;
    let accepted = req.body.accepted;
    const slug = req.params.slug;

    try {

        const exist_user = await user_obj.show(slug);
        if (!status) {
            status = exist_user?.getDataValue('status');
        } 
        if (!accepted) {
            accepted = exist_user?.getDataValue('accepted');
        }
        
        //convert token to user object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        
        if (user.role === 'admin') {
            const result = await user_obj.update_from_admin(accepted, status, slug);
            return res.status(200).json({ user: result });// result
        }
        return res.status(400).json('Not allowed.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }
}
//main routes of user model
function mainRoutes(app: Application) {

    app.get('/users', index);
    app.get('/users/:slug', show);
    app.post('/users', create);
    app.patch('/users/:slug', update);
    app.delete('/users/:slug', delete_);

    app.post('/login', login);
    app.post('/approve_user/:slug', approve_user);

}

export default mainRoutes;

// hash password, bycript token when create, 