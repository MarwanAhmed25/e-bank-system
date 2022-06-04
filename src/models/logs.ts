import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config/config';

//get the account model
const log_model = db.Logs;

export type log = {
    reciver: string,
    amount: number,
    operation_number: string,
    sender:string,
    created_at:Date,
}
//class of CRUD operation in account model
export class Log {
    //show all rows in the account table
    async index() {
        try {
            return await log_model.findAll();
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //show one row in the account table
    async show(account_number: string) {
        try {
            return await log_model.findAll({ where: { sender: account_number } });
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    //add new row in the account table
    async create(l: log) {
        try {        
            return await log_model.create(l);
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    
    
    
};

