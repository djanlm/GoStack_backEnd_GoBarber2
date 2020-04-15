import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // decorator. armazena appointment na tabela de appointments
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  // Não precisa mais de construtor
  // constructor(provider: string, date: Date){} Sem TDO
  /* constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Omit<> é como uma função que recebe dois parametros, o tipo e a variável que eu quero omitir.
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  } */
}

export default Appointment;
