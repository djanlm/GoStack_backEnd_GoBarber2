import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsReposiroty';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  // a interface repository recebe o model

  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo'); // o segundo parametro é o nome da conexão
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
