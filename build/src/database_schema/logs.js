"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var logs = {
    operation_number: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    sender: {
        // 0 means send to another account, 1 means charge to my account
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reciver: {
        // 0 means send to another account, 1 means charge to my account
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
};
exports.default = logs;
