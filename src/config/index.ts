import {config} from "dotenv";

config();

export default {
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    SALT_BCRYPT: process.env.SALT_BCRYPT,
    ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE
};
