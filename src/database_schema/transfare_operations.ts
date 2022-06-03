import { DataTypes } from "sequelize";

const operations = {
    operation_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isNumeric: true
        }
    },
    from_or_to: { // 0 means send to another account, 1 means charge to my account
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
    },
    balance_before: {
        type: DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate:{
            min:0
        }
    },
    balance_after: {
        type: DataTypes.FLOAT,
        default: 0,
        allowNull: false,
        validate:{
            min:0
        }
        
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}
    
export default operations;   