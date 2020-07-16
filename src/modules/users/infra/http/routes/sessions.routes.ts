import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

/** Create session */
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  // é injetado pelo container
  const authenticateUser = container.resolve(AuthenticateUserService);

  // retorna o token gerado pela autenticação e o usuário
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password; // não é recomendado mostrar o password na resposta

  return response.json({ user, token });
});

export default sessionsRouter;
