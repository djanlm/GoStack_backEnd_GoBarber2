import 'reflect-metadata'; // usado pelo typeorm
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors'; // usado pra tratar erros

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Essa linha não é segura e só foi usada pra testar o envio de email, pois estava dando erro sem essa linha. NÃO DEVE SER USADA EM PRODUÇÃO

const app = express();

app.use(cors());
app.use(express.json());

// rota pra visualizar as imagens localhost:3333/files/nomeDaImagem
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());
// tratativa dos erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Se o erro foi gerado pela minha aplicação
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  // Se for um erro que não conheço
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
