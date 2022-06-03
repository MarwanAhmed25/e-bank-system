import db from '../database';
import bcrypt from 'bcrypt';
import { Account } from './accounts';
import config from '../config/config';
import get_random_number from '../services/random_int';

//get the user model
const user_model = db.User;
const account_obj = new Account();
export type user = {
    id?:number,
    email: string,
    accepted: boolean,
    password: string,
    name: string,
    phone: string,
    status: string,
    role: string,
    slug?: string
}
//class of CRUD operation in user model
export class User {
    //show all rows in the user table
    async index() {
        try {
            return await user_model.findAll({where: {role:'user'}});
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the user table
    async show(slug: string) {
        try {
            return await user_model.findOne({ where: { slug: slug } });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async create(u: user) {
        try {      
               //hashin password using round and extra from .env file and password from request.body
        const hash = bcrypt.hashSync(u.password + config.extra_password, parseInt(config.password_round as string));
        u.password = hash;      
            return await user_model.create(u);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //update exist row in the user table
    async update(email: string, name: string, slug:string, phone:string, old_slug:string) {
        try {
            const result = await user_model.update({email, name, slug, phone}, { where: { slug: old_slug } ,returning: true});
            console.log(result);

            return result;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //delete one row in the user table
    async delete(slug: string) {
        try {
            await account_obj.delete(slug);
            const result = await user_model.destroy({ where: { slug: slug } });
                        
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //login
    async login(email:string, password:string) {
        try{
            const result = await user_model.findOne({where: {email: email}});

            const exist_password = result?.getDataValue('password');
            const isTrue = await bcrypt.compare(password + config.extra_password, exist_password);
            if(isTrue)
                return result;
        }catch(e){
            throw new Error('Email or password wrong.');
        }
    }
    //update exist row in the user table
    async update_from_admin(accepted: boolean, status: string, slug:string) {
        try {
            const result = await user_model.update({accepted, status}, { where: { slug: slug }, returning: true });
            const obj = JSON.parse(JSON.stringify(result));
            const id_ = obj[1][0].id;
            
            if(accepted && status === 'active')
            {
                const num = get_random_number(id_);
                account_obj.create(slug,num);
            }
            return 'updated';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the user table
    async reset_password(password: string, slug: string) {
        try {      
               //hashin password using round and extra from .env file and password from request.body
        const hash = bcrypt.hashSync(password + config.extra_password, parseInt(config.password_round as string));
        password = hash;      
            return await user_model.update({password},{where:{slug:slug}, returning:true});
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
};

