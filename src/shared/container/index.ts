import { container } from 'tsyringe';

import '@modules/users/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>( // registersingleton cria apenas uma instancia da classe, register criaria uma instancia sempre que fosse chamado
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>( // registersingleton cria apenas uma instancia da classe, register criaria uma instancia sempre que fosse chamado
  'UsersRepository',
  UsersRepository,
);
