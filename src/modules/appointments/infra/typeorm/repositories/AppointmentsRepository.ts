import { getRepository, Repository} from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';


class AppointmentsRepository implements IAppointmentsRepository{
  // a interface repository recebe o model

  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  /** Checks if there's an appointment in the given date */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // Toda função assincrona retorna uma promise
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment; // in case it doesnt find an appointment it returns null
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  };
}

export default AppointmentsRepository;
