"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const logs = {
    operation_number: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
    },
    sender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reciver: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
};
exports.default = logs;
