"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var users = {
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    accepted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8,
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isNumeric: true,
        },
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [['active', 'deactive', 'suspended']],
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [['user', 'admin']],
        },
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
};
exports.default = users;
