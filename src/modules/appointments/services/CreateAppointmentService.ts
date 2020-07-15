import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

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
  date: Date;
}

/**
 * Dependency Inversion
 */

class CreateAppointmentService {

  constructor(
    private appointmentsRepository: IAppointmentsRepository
    ){}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date); // rounds the hour

    /** Check if there's an appointment at the same time */
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError("There's already an appointment at this time");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
