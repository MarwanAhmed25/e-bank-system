import { DataTypes } from 'sequelize';

const account = {
  accepted: {
    // 0 means not acceppted, 1 acceppted
    type: DataTypes.BOOLEAN,
    default: false,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    default: 0,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  account_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
};

export default account;
