"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var account = {
    accepted: {
        // 0 means not acceppted, 1 acceppted
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    account_number: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
};
exports.default = account;
