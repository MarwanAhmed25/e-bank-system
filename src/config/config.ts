import dotenv from 'dotenv';

dotenv.config();

const config = {
  //for jwt token
  secret: process.env.secret||'marwan',
  //password hashing
  extra_password: process.env.extra_password||'marwan',
  password_round: process.env.password_round||12,
  //for email
  user_email: process.env.user_email,
  password_email: process.env.user_password,
  //database
  db_host:
    process.env.db_host || 'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
  db_user: process.env.db_user || 'nowcexnbaevbru',
  db_password:
    process.env.db_password ||
    'd798bc7f4fa2e5591aeb98296bf90e0eb80123ba3a8a04772795f9371cb3acfc',
  db_name: process.env.db_name || 'd4inkvgfkimblv',
  db_port: process.env.db_port || 5432,
  db_dilect: process.env.db_dilect || 'postgres',
  //url for local database
  DB_URL_LOCAL: process.env.db_url_local,
};

export default config;
