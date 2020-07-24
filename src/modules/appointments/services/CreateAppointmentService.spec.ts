import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime(); // as 12 horas
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13), // depois das 12 horas
      user_id: 'fakeId',
      provider_id: '1212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2030, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'fakeId',
      provider_id: '1212',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'fakeId',
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'fakeId',
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user and provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '1212', // mesma id do provider
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside 8-17 hours range', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7), // antes das 8 horas
        user_id: 'fakeUserId',
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18), // depois das 17 horas
        user_id: 'fakeUserId',
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
