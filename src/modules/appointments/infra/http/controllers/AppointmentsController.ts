import { Request, Response } from 'express';
// import { parseISO } from 'date-fns'; // parseIso converts string to date format
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    // const parsedDate = parseISO(date); não precisa mais disso pq o celebrate já está fazendo isso na rota de appointments

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
