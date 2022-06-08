import { DataTypes } from 'sequelize';

const logs = {
  operation_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  sender: {
    // 0 means send to another account, 1 means charge to my account
    type: DataTypes.STRING,
    allowNull: false,
  },
  reciver: {
    // 0 means send to another account, 1 means charge to my account
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isValdate(v:number){
        if(v<1)
          throw new Error('Amount must be more than 0.')
      }
    },
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export default logs;
