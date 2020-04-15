import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // a interface repository recebe o model
  /** Checks if there's an appointment in the given date */
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Toda função assincrona retorna uma promise
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null; // in case it doesnt find an appointment it returns null
  }
}

export default AppointmentsRepository;
