import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // constructor(provider: string, date: Date){} Sem TDO
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Omit<> é como uma função que recebe dois parametros, o tipo e a variável que eu quero omitir.
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
