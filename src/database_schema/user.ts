import { DataTypes } from 'sequelize';

function fun(v:string){

}

const users = {
  email: {
    type: DataTypes.STRING,
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
    type: DataTypes.BOOLEAN,
    default: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter the password'
      },
    },
    
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      notNull: {
        msg: 'Please enter your phone.'
      },
      isT(v:string){
        
         if(v.length!==11 || v[0] !== '0' || v[1]!=='1')
          throw new Error('please enter a valid phone number like [01555555555].'); 
      },
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args:[['active', 'deactive', 'suspended']],
        msg: "Status must be in [ active, deactive, suspended]"
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args:[['user', 'admin']],
        msg: "Status must be in [ user, admin ]"
      },
      notNull: {
        msg: 'Please enter your name'
      }
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
