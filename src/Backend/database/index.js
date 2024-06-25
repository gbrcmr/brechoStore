import pg from "pg"
import dotenv from "dotenv"

const { Client } = pg;
dotenv.config();

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

client.connect();

export default query = async (query, values) => {
    const { rows } = await client.query(query, values);
    return rows;
};
