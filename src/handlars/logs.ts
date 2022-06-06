import { Request, Response, Application } from "express";
import { Log, log } from "../models/logs";
import { Account } from "../models/accounts";
import pagination from "../services/pagination";
import jwt from "jsonwebtoken";
import config from '../config/config';
import jwtDecode from "jwt-decode";
import get_random_number from "../services/random_int";

const log_obj = new Log();
const account_obj = new Account();
const secret = config.secret as unknown as string;

//return a json data for all Accounts in database
async function index(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    const account_number = Number(req.query.account_number);
    try {
        //convert token to Account object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jwt.verify(token,secret);
        console.log(user);

        if (permisson && user.role === 'admin') {
            let result = await log_obj.index();
            if(account_number){
                result = result.filter(a => a.getDataValue('sender') === account_number || a.getDataValue('reciver') === account_number);
            }
            //if page exist will paginate
            const paginated_result = pagination(page, limit, result);
            
            return res.status(200).json(paginated_result);
        }
        res.status(400).json('not allowed for you.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }

}

//return a json data for one Account in database
async function show(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    //if exist query for pagination
    const page = Number(req.query.page);
    const limit = Number(req.query.limit) || 20;
    try {
        //convert token to Account object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        const permisson = jwt.verify(token, secret);
        console.log(user);

        if (permisson) {
            const account = await account_obj.show(user.slug);
            const account_number = account?.getDataValue('account_number');
            const result = await log_obj.show(account_number);
            const paginated_result = pagination(page, limit, result);

            return res.status(200).json(paginated_result);//result
        }
        return res.status(400).json('Not allowed.');
    } catch (e) {
        res.status(400).json(`${e}`);
    }

}

//create and return a json data for the user in database
async function create(req: Request, res: Response) {
    const token = req.headers.token as unknown as string;
    const l: log = req.body;


    try {
        //convert token to Account object
        const x = jwtDecode(token);
        const user = JSON.parse(JSON.stringify(x)).user;
        console.log(user);

        if(user.status != 'active')
            return res.status(400).json('User not active.');

        const sender = await account_obj.show(user.slug);
        const reciver = await account_obj.show_by_account_number(l.reciver);
        if(!sender)
            return res.status(400).json('login please .')
        if(!reciver)
            return res.status(400).json('please enter a valid reciver number.')
        const permisson = jwt.verify(token, secret);
        if (permisson) {
            l.created_at = new Date();
            l.operation_number = get_random_number(user.id);

            l.sender = sender?.getDataValue('account_number');
            let sender_balance = sender?.getDataValue('balance');
            let reciver_balance = reciver?.getDataValue('balance');
            const sender_acceppted = sender?.getDataValue('accepted');
            
            
            if(sender_balance < l.amount){
                return res.status(400).json('Your balance is less than amount.');
            }
            if(!sender_acceppted)
                return res.status(400).json('your account pendding.');
            
            sender_balance -= l.amount;
            await account_obj.update(sender_balance, user.slug);
            await account_obj.update(reciver_balance+l.amount, reciver?.getDataValue('userSlug'));
            
            const result = await log_obj.create(l);
            return res.status(200).json(result);
        }
        res.status(400).json('login first');
    } catch (e) {
        res.status(400).json(`${e}`);
    }

}
//main routes of Account model
function mainRoutes(app: Application) {

    app.get('/all_logs', index);
    app.get('/logs', show);
    app.post('/logs', create);
   
}

export default mainRoutes;

// hash password, bycript token when create, 