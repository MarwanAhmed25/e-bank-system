"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const operations = {
    my_account_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    user_account_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    from_or_to: {
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
    },
    balance_before: {
        type: sequelize_1.DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    balance_after: {
        type: sequelize_1.DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
};
exports.default = operations;
