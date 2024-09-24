import { Pool } from "pg";

import dotenv from "dotenv";

dotenv.config({
    path: __dirname + '/file.env' });

const userkey: string | undefined = process.env.DB_USER;

const passwordkey: string | undefined = process.env.DB_PASSWORD;

const databasekey: string | undefined = process.env.DB_DATABASE;

const hostkey: string | undefined = process.env.DB_HOST;

export const database = new Pool ({

    user: userkey,

    password: passwordkey,

    database: databasekey,

    port: 5432,

    host: hostkey,

});