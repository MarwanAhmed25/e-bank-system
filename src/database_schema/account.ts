import { DataTypes } from "sequelize";

const account = {
    // forign key with user model
    user_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            unique:true
        },
    },
    accepted: {// 0 means not acceppted, 1 acceppted
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate:{
            min: 0
        }
        
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            unique: true,
            isNumeric: true
        }
    }
}

export default account;