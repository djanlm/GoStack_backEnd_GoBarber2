import { Router } from 'express';
import { parseISO } from 'date-fns'; // parseIso converts string to date format

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// esse middleware vai ser usado em todas as rotas aqui
appointmentsRouter.use(ensureAuthenticated);

/** Fetches all appointments */
// appointmentsRouter.get('/', async (request, response) => {
/** find method fetches all appointments */
// const appointments = await appointmentsRepository.find();
// return response.json(appointments);
// });

/** Create appointment */
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
