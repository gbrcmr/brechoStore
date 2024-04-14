import { UserRepository } from "../repositories/UserRepository.js";

class UserController {
    async store(request, response) {
        const userRepository = new UserRepository();
        const { nome, email, telefone, senha } = request.body;
        const user = await userRepository.create(nome, email, telefone, senha);
        response.json(user);
    }
}

export { UserController };