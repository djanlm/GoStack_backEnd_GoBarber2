import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// esse middleware vai ser usado em todas as rotas aqui
appointmentsRouter.use(ensureAuthenticated);

/** Fetches all appointments */
// appointmentsRouter.get('/', async (request, response) => {
/** find method fetches all appointments */
// const appointments = await appointmentsRepository.find();
// return response.json(appointments);
// });

/** Create appointment */
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
