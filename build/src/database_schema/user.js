"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
function fun(v) {
}
var users = {
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "email must be a valid"
            },
            notNull: {
                msg: 'Please enter email'
            }
        }
    },
    accepted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        default: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter the password'
            },
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            notNull: {
                msg: 'Please enter your phone.'
            },
            isT: function (v) {
                if (v.length !== 11 || v[0] !== '0' || v[1] !== '1')
                    throw new Error('please enter a valid phone number like [01555555555].');
            },
        }
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['active', 'deactive', 'suspended']],
                msg: "Status must be in [ active, deactive, suspended]"
            },
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['user', 'admin']],
                msg: "Status must be in [ user, admin ]"
            },
            notNull: {
                msg: 'Please enter your name'
            }
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
