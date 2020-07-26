import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'; // serve pra validação

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// esse middleware vai ser usado em todas as rotas aqui
appointmentsRouter.use(ensureAuthenticated);

/** Fetches all appointments */
// appointmentsRouter.get('/', async (request, response) => {
/** find method fetches all appointments */
// const appointments = await appointmentsRepository.find();
// return response.json(appointments);
// });

/** Create appointment */
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(), // não consegui passar uma data no formato valido pelo insominia
    },
  }),

  appointmentsController.create,
);

/* Retorna os appointments do prestador de serviço logado */
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
