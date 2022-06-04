import { DataTypes } from "sequelize";

const logs = {
    operation_number: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate:{
            isNumeric: true,
        }
    },
    sender: { // 0 means send to another account, 1 means charge to my account
        type: DataTypes.STRING,
        allowNull: false,
    },
    reciver: { // 0 means send to another account, 1 means charge to my account
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate:{
            min:1
        }
    },
   
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}
    
export default logs;   