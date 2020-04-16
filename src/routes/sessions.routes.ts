import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/** Create session */
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  // retorna o token gerado pela autenticação e o usuário
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password; // não é recomendado mostrar o password na resposta

  return response.json({ user, token });
});

export default sessionsRouter;
