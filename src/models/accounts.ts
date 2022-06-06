import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config/config';

//get the account model
const account_model = db.Account;

export type account = {
  balance: string;
  accepted: boolean;
  account_number: string;
  userSlug: string;
};
//class of CRUD operation in account model
export class Account {
  //show all rows in the account table
  async index() {
    try {
      return await account_model.findAll();
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  //show one row in the account table
  async show(userSlug: string) {
    try {
      return await account_model.findOne({ where: { userSlug: userSlug } });
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  //show one row in the account table
  async show_by_account_number(account_number: string) {
    try {
      return await account_model.findOne({
        where: { account_number: account_number },
      });
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  //add new row in the account table
  async create(userSlug: string, account_number: string) {
    try {
      const exist = await this.show(userSlug);
      if (exist) return exist;
      return await account_model.create({
        balance: 0,
        accepted: false,
        userSlug: userSlug,
        account_number: account_number,
      });
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  //update exist row in the account table
  async update(balance: number, userSlug: string) {
    try {
      const result = await account_model.update(
        { balance },
        { where: { userSlug: userSlug }, returning: true }
      );

      return result;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  //update exist row in the account table
  async approve(accepted: boolean, userSlug: string) {
    try {
      const result = await account_model.update(
        { accepted },
        { where: { userSlug: userSlug }, returning: true }
      );

      return result;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  //delete one row in the account table
  async delete(userSlug: string) {
    try {
      const result = await account_model.destroy({
        where: { userSlug: userSlug },
      });

      return 'deleted';
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
}
