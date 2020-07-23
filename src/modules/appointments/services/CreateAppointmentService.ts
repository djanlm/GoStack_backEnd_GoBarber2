import { startOfHour, isBefore, getHours } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
/**
 * Recebimento das informações
 * Tratativa de erros e excessões
 * Acesso ao repositório
 */

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

/**
 * Dependency Inversion
 */
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date); // rounds the hour

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment in a past date");
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8 am and 5pm.',
      );
    }
    /** Check if there's an appointment at the same time */
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError("There's already an appointment at this time");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
