import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validação do token JWT

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  // Bearer mflkdmgdmfdlmfd
  const [, token] = authHeader.split(' '); // retorna um array com oq estava antes do espaço e oq estava depois do espaço

  try {
    const decoded = verify(token, authConfig.jwt.secret); // lança um erro caso nao seja compativel

    const { sub } = decoded as TokenPayload; // força o decoded a ser do tipo TokenPayload

    /** Guarda o id do usuário dentro do request, assim temos como saber qual usuário tá fazendo requests */
    request.user = {
      // precisou ir na pasta src/@types e criar o arquivo express.d.ts
      id: sub,
    };
    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
