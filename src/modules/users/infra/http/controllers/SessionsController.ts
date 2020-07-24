import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

// index, show, create, update, delete
export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    // é injetado pelo container
    const authenticateUser = container.resolve(AuthenticateUserService);

    // retorna o token gerado pela autenticação e o usuário
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // delete user.password; // não é recomendado mostrar o password na resposta

    // O class transformer vai ser o responsavel por deletar o user.password
    return response.json({ user: classToClass(user), token });
  }
}
