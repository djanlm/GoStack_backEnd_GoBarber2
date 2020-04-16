import { Router } from 'express';
import { parseISO } from 'date-fns'; // parseIso converts string to date format
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// esse middleware vai ser usado em todas as rotas aqui
appointmentsRouter.use(ensureAuthenticated);

/** Fetches all appointments */
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  /** find method fetches all appointments */
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

/** Create appointment */
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
