import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';
/**
 * Recebimento das informações
 * Tratativa de erros e excessões
 * Acesso ao repositório
 */

interface Request {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion
 */

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date); // rounds the hour

    /** Check if there's an appointment at the same time */
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError("There's already an appointment at this time");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    /** Save appoint in database */
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
