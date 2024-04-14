import Router from "express"
import { UserController } from "./controllers/UserController.js";

const router = Router();
const userController = new UserController();
router.post('/cadaster', userController.store);

export { router }

// const routes = () => {
//     const userController = new UserController();
//     router.post('/cadaster', () => {
//         console.log('testando novamente')
//         userController.store()
//     });


// app.post('/login', async (req, res) => {
//     const client = await pool.connect();
//     const sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?"
//     const values = [
//         req.body.email,
//         req.body.senha
//     ]
//     client.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.json("Erro ao logar");
//         }
//         return res.json(data);
//     })
// })



// app.get("/", (req, res) => {
//     res.json({
//         message: "Funcionando!"
//     });
// });

// app.get("/users", async (req, res) => {
//     const client = await pool.connect();
//     const { rows } = await client.query("SELECT * FROM usuario")
//     return res.json(rows);
// });
