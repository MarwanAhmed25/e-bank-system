"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const account = {
    // forign key with user model
    user_slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            unique: true
        },
    },
    accepted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    account_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            unique: true,
            isNumeric: true
        }
    }
};
exports.default = account;
