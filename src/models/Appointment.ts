import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

/**
 * Um para um (OneToOne)
 * Um para muitos (OneToMany)
 * Muitos para muitos (ManyToMany)
 */
@Entity('appointments') // decorator. armazena appointment na tabela de appointments
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string; // vai ser o id de um user

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' }) // qual coluna vai estabelecer essa relação. chave estrangeira
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
