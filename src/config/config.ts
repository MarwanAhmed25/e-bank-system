import dotenv from 'dotenv';

dotenv.config();

const config = {
    secret: process.env.secret,
    extra_password: process.env.extra_password,
    password_round: process.env.password_round,
    DB_URL: process.env.DB_URL
}

export default config;