import { Sequelize } from 'sequelize';
import user from './database_schema/user';
import account from './database_schema/account';
import logs from './database_schema/logs';
import config from './config/config';
import fs from 'fs';
//const sequelize = new Sequelize(config.DB_URL_LOCAL as unknown as string) // Example for postgres

const sequelize = new Sequelize({
dialect:'postgres',
username:'nowcexnbaevbru',
password:'d798bc7f4fa2e5591aeb98296bf90e0eb80123ba3a8a04772795f9371cb3acfc',
host:'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
port:5432,
database:'d4inkvgfkimblv',
ssl:true,
dialectOptions: {
  ssl: {
    rejectUnauthorized: false
}
} 

}); 


const User = sequelize.define('user', user,{createdAt: false, updatedAt:false});
const Account = sequelize.define('account', account,{createdAt: false, updatedAt:false});
const Logs = sequelize.define('logs', logs,{createdAt: false, updatedAt:false});

User.hasOne(Account);
Account.belongsTo(User);

const create = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
    await sequelize.sync({force:false});
    console.log('created tables...');

}

const db = {
  create,
  User,
  Account,
  Logs
}

export default db;