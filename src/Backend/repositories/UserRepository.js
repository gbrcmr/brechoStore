import { query } from '../database/index.js'

class UserRepository {
    async create(nome, email, telefone, senha) {
        const [row] = await db.query(`
        INSERT INTO usuario(nome, email, telefone, senha)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `, [nome, email, telefone, senha]);
        return row;
    }
}

export { UserRepository };