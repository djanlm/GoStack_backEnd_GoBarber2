import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsReposiroty';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>( // registersingleton cria apenas uma instancia da classe, register criaria uma instancia sempre que fosse chamado
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>( // registersingleton cria apenas uma instancia da classe, register criaria uma instancia sempre que fosse chamado
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>( // registersingleton cria apenas uma instancia da classe, register criaria uma instancia sempre que fosse chamado
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>( // registersingleton cria apenas uma instancia da classe, register criaria uma instancia sempre que fosse chamado
  'NotificationsRepository',
  NotificationsRepository,
);
