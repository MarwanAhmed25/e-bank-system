import { Request, Response, Application } from 'express';
import { Account, account } from '../models/accounts';
import pagination from '../services/pagination';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import jwtDecode from 'jwt-decode';

const account_obj = new Account();
const secret = config.secret as unknown as string;

//return a json data for all Accounts in database
async function index(req: Request, res: Response) {
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
      let result = await account_obj.index();

      if (user.role === 'user') {
        result = result.filter((a) => a.getDataValue('accepted') == true);
        //if page exist will paginate
        const paginated_result = pagination(page, limit, result);
        return res.status(200).json(paginated_result);
      }
      //if page exist will paginate
      const paginated_result = pagination(page, limit, result);
      return res.status(200).json(paginated_result);
    }
    res.status(400).json('not allowed.');
  } catch (e) {
    res.status(400).json(`${e}`);
  }
}

//return a json data for one Account in database
async function show(req: Request, res: Response) {
  const token = req.headers.token as unknown as string;
  const slug = req.params.slug;
  try {
    //convert token to Account object
    const x = jwtDecode(token);
    const user = JSON.parse(JSON.stringify(x)).user;
    const permisson = jwt.verify(token, secret);
    console.log(user);

    if (permisson && (user.slug === slug || user.role === 'admin')) {
      const result = await account_obj.show(slug);
      return res.status(200).json(result); //result
    }
    return res.status(400).json('Not allowed.');
  } catch (e) {
    res.status(400).json(`${e}`);
  }
}

//update and return a json data for the Account in database
async function update(req: Request, res: Response) {
  const token = req.headers.token as unknown as string;
  const slug = req.params.slug;
  const balance = req.body.balance;
  try {
    //convert token to Account object
    const x = jwtDecode(token);
    const user = JSON.parse(JSON.stringify(x)).user;
    const permisson = jwt.verify(token, secret);
    console.log(user);

    const account = await account_obj.show(slug);
    const isAccepted = account?.getDataValue('accepted');

    if (permisson && isAccepted && user.slug === slug) {
      const result = await account_obj.update(balance, slug);
      return res.status(200).json(result);
    }
    res
      .status(400)
      .json('not allowed. may be account pedding or need to login');
  } catch (e) {
    res.status(400).json(`${e}`);
  }
}
//update and return a json data for the Account in database
async function approve(req: Request, res: Response) {
  const token = req.headers.token as unknown as string;
  const slug = req.params.slug;
  const accepted = req.body.accepted;

  try {
    //convert token to Account object
    const x = jwtDecode(token);
    const user = JSON.parse(JSON.stringify(x)).user;
    const permisson = jwt.verify(token, secret);
    console.log(user);

    if (permisson && user.role === 'admin') {
      const result = await account_obj.approve(accepted, slug);

      return res.status(200).json(result);
    }
    res.status(400).json('not allowed.');
  } catch (e) {
    res.status(400).json(`${e}`);
  }
}
//main routes of Account model
function mainRoutes(app: Application) {
  app.get('/users/accounts', index);
  app.get('/users/accounts/:slug', show);
  app.patch('/users/accounts/:slug', update);
  app.post('/users/accounts/:slug/approve_account', approve);
}

export default mainRoutes;

// hash password, bycript token when create,
