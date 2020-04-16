import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id); // Só vai ter id se passou pela rota de autenticação

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // caso já tenha avatar, irá remove-lo
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // traz o status do arquivo, so se ele existir

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user); // save também atualiza o usuario

    return user;
  }
}

export default UpdateUserAvatarService;
