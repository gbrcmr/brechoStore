import pg from "pg"
import dotenv from "dotenv"

const { Pool } = pg;


dotenv.config();

export async function connect() {


    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    })

    const client = await pool.connect();
    console.log("Deu boa")

    const res = await client.query("select now()");
    console.log(res.rows[0])
    client.release();

    global.connection = pool;
    return pool.connect;
}

export async function selectUsers() {

    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    })

    const client = await pool.connect();
    const res = await client.query("SELECT * FROM usuario")
    return res.rows
}

export async function loginDB() {

    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    })

    const client = await pool.connect();
    const res = await client.query("SELECT * FROM usuario")
    return res.rows
}