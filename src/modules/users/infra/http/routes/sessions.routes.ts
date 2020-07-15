import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

/** Create session */
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  // retorna o token gerado pela autenticação e o usuário
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password; // não é recomendado mostrar o password na resposta

  return response.json({ user, token });
});

export default sessionsRouter;
