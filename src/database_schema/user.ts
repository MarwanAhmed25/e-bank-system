import { DataTypes } from 'sequelize';

const users = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
    },
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      isNumeric: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['active', 'deactive', 'suspended']],
    },
  },
  role: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['user', 'admin']],
    },
  },
  slug: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
};

export default users;
