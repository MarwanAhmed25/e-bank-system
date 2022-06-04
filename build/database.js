"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./database_schema/user"));
const account_1 = __importDefault(require("./database_schema/account"));
const logs_1 = __importDefault(require("./database_schema/logs"));
//const sequelize = new Sequelize(config.DB_URL_LOCAL as unknown as string) // Example for postgres
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    username: 'nowcexnbaevbru',
    password: 'd798bc7f4fa2e5591aeb98296bf90e0eb80123ba3a8a04772795f9371cb3acfc',
    host: 'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd4inkvgfkimblv',
    ssl: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
const User = sequelize.define('user', user_1.default, { createdAt: false, updatedAt: false });
const Account = sequelize.define('account', account_1.default, { createdAt: false, updatedAt: false });
const Logs = sequelize.define('logs', logs_1.default, { createdAt: false, updatedAt: false });
User.hasOne(Account);
Account.belongsTo(User);
const create = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await sequelize.sync({ force: false });
    console.log('created tables...');
};
const db = {
    create,
    User,
    Account,
    Logs
};
exports.default = db;
