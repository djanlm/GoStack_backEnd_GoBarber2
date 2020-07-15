import 'reflect-metadata'; // usado pelo typeorm
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors'; // usado pra tratar erros

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

// rota pra visualizar as imagens localhost:3333/files/nomeDaImagem
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

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
